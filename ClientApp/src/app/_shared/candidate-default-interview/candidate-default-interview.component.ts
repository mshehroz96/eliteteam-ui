import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FILES_PATHS } from 'src/app';

@Component({
  selector: 'app-candidate-default-interview',
  templateUrl: './candidate-default-interview.component.html',
  styleUrls: ['./candidate-default-interview.component.css']
})
export class CandidateDefaultInterviewComponent implements OnInit {

  // @Input() onewayInterviewAnswers : any = {};

  private onewayInterviewAnswers: any[] = [];

  @Input()
  set answer(value: any[])
  {
    this.onewayInterviewAnswers = value;
    this.createVideoUrl(this.onewayInterviewAnswers[0]);
  }
  get answer()
  {
    return this.onewayInterviewAnswers;
  }

  constructor(private elRef: ElementRef) { }
  selectedItem: string = "";
  items: any[] = [];
  val: number = 0;
  products: [] = [];
  videUrl : any;

  ngOnInit(): void {

  }



  questionChanged(){
    const data = this.answer.filter((obj) => {
      return obj.questionText === this.selectedItem;
    });

    console.log(data);
    this.createVideoUrl(data[0]);
  }

  createVideoUrl(item:any): any{
    this.val = item.answerRating;
    this.videUrl = FILES_PATHS.MAP_ONEWAY_INTERVIEWS(item.answerVideoFileName);
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();

  }



}
