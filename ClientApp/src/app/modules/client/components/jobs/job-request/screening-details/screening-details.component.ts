import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { ScreeningQuestion } from 'src/app/_models/requisition/screening-question';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css']
})
export class ScreeningDetailsComponent implements OnInit {

  questionCategories: any[] = [];
  questions: any[] = [];

  requisitionRequest: RequisitionRequest;
  constructor(
    public loadingService: LoadingService,
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService,
    private screeningQuestionService: ScreeningQuestionService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
  }

  ngOnInit(): void {
    this.getQuestionCategories();
  }
  nextPage() {
    this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest);
    this.requisitionRequestService.activeStepIndex.next(4);
  }
  prevPage() {
    this.requisitionRequestService.activeStepIndex.next(2);
  }

  getQuestionCategories() {
    
    this.screeningQuestionService.getScreeningQuestionCategoriesByJobTitleId(this.requisitionRequest.jobTitle.jobTitleId).subscribe((res: any) => {
      if (res?.success) {
        this.questionCategories = res?.data;

        if(this.questionCategories.length>0)
        {
          this.getQuestionsByCategoryId(this.questionCategories[0]);
        }
      }
    });
  }


  addQuestion(question: any) {

    if (question.screeningQuestionId < 1) {

      let customQuestion = new ScreeningQuestion();
      customQuestion.screeningQuestionCategoryId = question.screeningQuestionCategoryId,
      customQuestion.screeningQuestionId = -this.getRandomInt(1, 100),
      customQuestion.title = question.title,
      customQuestion.options = []

      this.requisitionRequest.screeningQuestions.push(customQuestion);

      question.title = '';
    }
    else {
      this.requisitionRequest.screeningQuestions.push(question);

    }

  }
  removeQuestion(question: any) {
    let index = this.requisitionRequest.screeningQuestions.findIndex(x => x.screeningQuestionId == question.screeningQuestionId);

    if (index > -1) {
      this.requisitionRequest.screeningQuestions.splice(index, 1);
    }
  }

  isAdded(question: any): boolean {
    if (this.requisitionRequest.screeningQuestions.find(x => x.title == question.title))
      return true;
    else
      return false;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  getQuestionsByCategoryId(category: any) {
    
    this.questions=[];

    if (category.title == 'Custom Question') {
      this.questions = [
        {
          screeningQuestionCategoryId: category.screeningQuestionCategoryId,
          screeningQuestionId: -this.getRandomInt(1, 100),
          title: '',
          options: []
        }
      ]
    }
    else {
      
      this.screeningQuestionService.getScreeningQuestionsByCategoryId(category.screeningQuestionCategoryId)
      .subscribe((res: any) => {
        if (res?.success) {
          this.questions = res?.data;
        }
      });
    }
  }
}
