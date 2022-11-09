import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OneWayInterviewQuestion } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import Swal from 'sweetalert2';
import { QuestionConfigComponent } from './question-config/question-config.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';

@Component({
  selector: 'app-one-way-interview-questions',
  templateUrl: './one-way-interview-questions.component.html',
  styleUrls: ['./one-way-interview-questions.component.css']
})
export class OneWayInterviewQuestionsComponent implements OnInit {

  heading:string='Test';
  @Input() questions!:OneWayInterviewQuestion[];
  @Input() selectedTemplate!: OneWayInterviewTemplate;
  @Input() enableQuestionSetting: boolean=false;

  

  ref!: DynamicDialogRef;

  constructor(private oneWayInterviewService: OneWayInterviewService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    
  }

  addQuestion() {
    this.ref = this.dialogService.open(QuestionDetailsComponent, {
      header: 'Add Question',
      data: {
        id: 0,
        template:this.selectedTemplate,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.oneWayInterviewService.getInterviewQuestions(this.selectedTemplate.oneWayInterviewTemplateId).subscribe((res) => {
        this.questions = res?.data;
      });
    });
  }
  deleteQuestion(question:OneWayInterviewQuestion) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {

        this.oneWayInterviewService.deleteInterviewQuestion(question.oneWayInterviewQuestionId).subscribe((res) => {
          if (res.success) {
            this.questions.splice(this.questions.findIndex(x => x.oneWayInterviewQuestionId == question.oneWayInterviewQuestionId), 1);
          }
        })
      }
    });
  }
  editQuestion(question:OneWayInterviewQuestion) {
    this.ref = this.dialogService.open(QuestionDetailsComponent, {
      header: 'Edit Question',
      data: {
        id: question.oneWayInterviewQuestionId,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.oneWayInterviewService.getInterviewQuestions(this.selectedTemplate.oneWayInterviewTemplateId).subscribe((res) => {
        this.questions = res?.data;
      });
    });

  }

  questionConfig(question: OneWayInterviewQuestion) {
    this.ref = this.dialogService.open(QuestionConfigComponent, {
      header: 'Question Settings',
      data: {
        id: question.oneWayInterviewQuestionId,
        action: 'Edit'
      },
      width: '20%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.oneWayInterviewService.getInterviewQuestions(this.selectedTemplate.oneWayInterviewTemplateId).subscribe((res) => {
        this.questions = res?.data;
      });
    });

  }

}
