import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { ScreeningQuestion, ScreeningQuestionOption } from 'src/app/_models/requisition/screening-question';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';

@Component({
  selector: 'app-screening-question-details',
  templateUrl: './screening-question-details.component.html',
  styleUrls: ['./screening-question-details.component.css']
})
export class ScreeningQuestionDetailsComponent implements OnInit {


  question: ScreeningQuestion;
  submitted: boolean = false;
  categories: any[] = [];
  
  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private screeningQuestionService: ScreeningQuestionService) {
    this.question = new ScreeningQuestion();
  }

  ngOnInit(): void {

    this.question.screeningQuestionId = Number(this.config.data.id);

    this.getCategories();

    if (this.question.screeningQuestionId > 0) {
      this.screeningQuestionService.getScreeningQuestionById(this.question.screeningQuestionId).subscribe((res) => {
        if (res?.success) {
          this.question = res.data;

          console.log(this.question);
        }
      });
    }

  }

  addAnswerOption(event:any)
  {
      this.question.options = this.question.options.filter(x=>x.title!=null);

      if(!this.question.options.find(x=>x.title==event.value))
      {
        let option=new ScreeningQuestionOption();
        option.screeningQuestionId=this.question.screeningQuestionId;
        option.title = event.value;
        
        this.question.options.push(option);

        console.log(this.question.options);

      }
  }

  removeAnswerOption(event:any)
  {
    if (this.question.options.find(x => x.title == event.value)) {

      this.question.options.splice((this.question.options.findIndex(x => x.title == event.value)),1);
    }

  }
  getCategories() {

    this.screeningQuestionService.getScreeningQuestionCategories().subscribe((res: any) => {
      if (res?.success) {
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
    this.screeningQuestionService.createOrUpdateScreeningQuestion(this.question)
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