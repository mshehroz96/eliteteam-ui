import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { ScreeningQuestion } from 'src/app/_models/requisition/screening-question';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  question: ScreeningQuestion;
  submitted: boolean = false;
  categories: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private requisitionRequestService: RequisitionRequestService,
    private screeningQuestionService: ScreeningQuestionService) {
    this.question = new ScreeningQuestion();
  }

  ngOnInit(): void {

    this.question.requisitionScreeningQuestionId = Number(this.config.data.id);

    this.getCategories();

    if (this.question.requisitionScreeningQuestionId > 0) {
      this.requisitionRequestService.getScreeningQuestion(this.question.requisitionScreeningQuestionId).subscribe((res) => {
        if (res?.success) {
          this.question = res.data;
        }
      });
    }

  }

  getCategories() {

    this.screeningQuestionService.getScreeningQuestionCategoriesByJobTitleId(this.requisitionRequestService.requisitionRequest.jobTitle.jobTitleId).subscribe((res: any) => {
      if (res?.success) {

        console.log(res?.data);
        
        this.categories = res?.data;
      }
    });
  }

  closeModal(): void {
    this.ref.close(this.question);
  }


  saveQuestion() {
    this.submitted = true;
    console.log(this.question);
    this.requisitionRequestService.updateRequisitionScreenQuestion(this.question)
      .pipe(first())
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: error => {
          console.log('Error', error);
        }
      });
  }
}
