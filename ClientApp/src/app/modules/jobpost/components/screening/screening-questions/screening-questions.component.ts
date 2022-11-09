import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScreeningQuestion, ScreeningQuestionCategory } from 'src/app/_models/requisition/screening-question';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';
import Swal from 'sweetalert2';
import { ScreeningQuestionDetailsComponent } from './screening-question-details/screening-question-details.component';

@Component({
  selector: 'app-screening-questions',
  templateUrl: './screening-questions.component.html',
  styleUrls: ['./screening-questions.component.css']
})
export class ScreeningQuestionsComponent implements OnInit {

  @Input() questions!: ScreeningQuestion[];
  @Input() selectedCategory!: ScreeningQuestionCategory;

  @Input() enableQuestionSetting: boolean = false;



  ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private screeningQuestionService: ScreeningQuestionService) { }

  ngOnInit(): void {

  }

  addQuestion() {
    this.ref = this.dialogService.open(ScreeningQuestionDetailsComponent, {
      header: 'Add Question',
      data: {
        id: 0,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((question: any) => {
        this.getQuestions();
    });
  }
  deleteQuestion(question: ScreeningQuestion) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {

        this.screeningQuestionService.deleteScreeningQuestion(question.screeningQuestionId).subscribe((res) => {
          if (res.success) {
            this.questions.splice(this.questions.findIndex(x => x.screeningQuestionId == question.screeningQuestionId), 1);
          }
        })
      }
    });
  }
  getQuestions()
  {
    this.screeningQuestionService.getScreeningQuestionsByCategoryId(this.selectedCategory.screeningQuestionCategoryId).subscribe((res) => {
      this.questions = res?.data;
    }); 
  }
  editQuestion(question: ScreeningQuestion) {
    this.ref = this.dialogService.open(ScreeningQuestionDetailsComponent, {
      header: 'Edit Question',
      data: {
        id: question.screeningQuestionId,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((question: any) => {
        this.getQuestions();
    });

  }


}
