import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OneWayInterViewAnswerList } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { OneWayInterviewService } from 'src/app/_services';
import { OwiAnswerService } from 'src/app/_services/one-way-interview/owi-answer.service';

@Component({
  selector: 'app-owi-answers',
  templateUrl: './owi-answers.component.html',
  styleUrls: ['./owi-answers.component.css']
})
export class OwiAnswersComponent implements OnInit {

  @Input() source:string=''
  private _applicantId:number=0;
  @Input() 
  set applicantId(value:number)
  {
    this._applicantId=value;
    this.getAnswers();
  }

  get applicantId(): number {
    return this._applicantId;
  }
  private _answers: OneWayInterViewAnswerList[]=[];
  set answers(value:OneWayInterViewAnswerList[])
  {
      this._answers=value;

    if (this.answers.length > 0) {
      this.selected = this.answers[0];
      this.answerSelected.emit(this.selected);
    }
  }

  get answers()
  {
    return this._answers;
  }
  @Output('answerSelected') answerSelected = new EventEmitter<OneWayInterViewAnswerList>();

  selected!: OneWayInterViewAnswerList;
  constructor(
    private oneWayInterViewService: OneWayInterviewService, 
    private owiAnswerService: OwiAnswerService) { 
      this.selected=new OneWayInterViewAnswerList();
    }

  ngOnInit() {
      
  }

  getAnswers()
  {
    this.oneWayInterViewService.getOneWayInterviewAnswersByApplicantId(this.applicantId)
      .subscribe((res) => {

        if (res.success) {
          this.answers = res.data;
        }
      });
  }
  selectAnswer(answer:OneWayInterViewAnswerList)
  {
    this.selected=answer;
    this.answerSelected.emit(answer);
  }

}
