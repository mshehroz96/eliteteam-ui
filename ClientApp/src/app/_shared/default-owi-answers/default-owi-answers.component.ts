import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-owi-answers',
  templateUrl: './default-owi-answers.component.html',
  styleUrls: ['./default-owi-answers.component.css']
})
export class DefaultOWIAnswersComponent implements OnInit {
  @Input() onewayInterviewAnswers : any = {};
  constructor() { }
  @Output('answerSelected') answerSelected = new EventEmitter<any>();

  ngOnInit(): void {

  }

  showVideo(item:any) {
    this.answerSelected.emit(item);
  }

}
