import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Component({
  selector: 'app-default-owi-detail',
  templateUrl: './default-owi-detail.component.html',
  styleUrls: ['./default-owi-detail.component.css']
})
export class DefaultOWIDetailComponent implements OnInit {

  private _answer!: any;

  @Input()
  set answer(value: any)
  {
    this._answer=value;
    this.videoUrl = FILES_PATHS.MAP_ONEWAY_INTERVIEWS(this.answer.answerVideoFileName);
    this.video = this.elRef.nativeElement.querySelector('video');

    if(this.video)
    {
      this.video.load();
    }
  }

  get answer()
  {
    return this._answer;
  }

  video:any;
  videoUrl:string='';

  constructor(private elRef:ElementRef) {
  }

  ngAfterViewInit(): void {
    this.video = this.elRef.nativeElement.querySelector('video');
  }
  videUrl: any;
  ngOnInit(): void {

  }

}
