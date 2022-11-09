import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OneWayInterviewQuestionList } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewService } from 'src/app/_services';

@Component({
  selector: 'app-owi-questions',
  templateUrl: './owi-questions.component.html',
  styleUrls: ['./owi-questions.component.css']
})
export class OwiQuestionsComponent implements OnInit {

  @Input('requisitionId') requisitionId:string=''
  questions:OneWayInterviewQuestionList[]=[];
  
  constructor(private oneWayInterViewService:OneWayInterviewService) { }

  ngOnInit() {

    if(this.requisitionId.length>0)
    {
      this.oneWayInterViewService.getOneWayInterviewQuestionsByRequisitionId(this.requisitionId)
        .subscribe((res) => {
          if (res.success) {
            this.questions = res.data;
          }
        });
    }
  }

}
