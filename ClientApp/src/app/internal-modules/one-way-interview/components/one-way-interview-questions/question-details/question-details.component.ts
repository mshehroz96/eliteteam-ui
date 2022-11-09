import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { OneWayInterviewQuestion } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent implements OnInit {

  
  questionsBank:any[]=[];
  customQuestion:boolean=true;
  question: OneWayInterviewQuestion;
  submitted: boolean = false;
  templates: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private oneWayInterviewService: OneWayInterviewService) {
    this.question = new OneWayInterviewQuestion();
  }

  ngOnInit(): void {

    this.question.oneWayInterviewQuestionId = Number(this.config.data.id);
    
    this.question.interviewTemplates.push(this.config.data.template);

    this.getTemplates();

    this.getQuestionsBank();

    if (this.question.oneWayInterviewQuestionId > 0) {
      this.oneWayInterviewService.getInterviewQuestion(this.question.oneWayInterviewQuestionId).subscribe((res) => {
        if (res?.success) {
          this.question = res.data;
        }

      });
    }
    

  }

  setCustomQuestion(value:boolean){
    this.customQuestion=value;
  }
  getTemplates() {

    this.oneWayInterviewService.getInterviewTemplates().subscribe((res: any) => {
      if (res?.success) {
        this.templates = res?.data;
      }
    });
  }

  getQuestionsBank() {

    this.oneWayInterviewService.getQuestionsBank().subscribe((res: any) => {
      if (res?.success) {
        this.questionsBank = res?.data;
      }
    });
  }

  closeModal(): void {
    this.ref.close(this.question);
  }


  saveQuestion() {
    this.submitted = true;
    console.log(this.question);
    this.oneWayInterviewService.createOrUpdateInterviewQuestion(this.question)
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
