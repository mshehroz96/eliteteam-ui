import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FILES_PATHS } from 'src/app';
import { OneWayInterViewAnswerComment, OneWayInterViewAnswerCommentList, OneWayInterViewAnswerList, OneWayInterViewAnswerRating, OneWayInterViewAnswerRatingList } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { AuthenticationService, OneWayInterviewService } from 'src/app/_services';
import { OwiAnswerService } from 'src/app/_services/one-way-interview/owi-answer.service';

@Component({
  selector: 'app-owi-answer-details',
  templateUrl: './owi-answer-details.component.html',
  styleUrls: ['./owi-answer-details.component.css']
})
export class OwiAnswerDetailsComponent implements OnInit,AfterViewInit{

  
  private _answer!: OneWayInterViewAnswerList;
  
  @Input() 
  set answer(value: OneWayInterViewAnswerList)
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
  comment: string = '';

  constructor(private owiAnswerService: OwiAnswerService,
    private owiService: OneWayInterviewService, 
    private authenticationService: AuthenticationService,
    private elRef:ElementRef) {
  }
  ngAfterViewInit(): void {
    this.video = this.elRef.nativeElement.querySelector('video');
  }


  ngOnInit() {
    this.owiAnswerService.selectedAnswer$.subscribe((x => {
      this.answer = x;
    }));
  }

  setAnswerRating(event: any) {

    if (this.answer.userRating == 0) {
      let userRating = new OneWayInterViewAnswerRating();

      userRating.oneWayInterviewAnswerId = this.answer.oneWayInterviewAnswerId;
      userRating.rating = event.value;

      this.owiService.addOneWayInterviewAnswerRating(userRating).subscribe((res) => {
        console.log(res);
      });
    }
  }

  addComment() {
    let commentObj = new OneWayInterViewAnswerComment();
    commentObj.commentText = this.comment;
    commentObj.oneWayInterviewAnswerId = this.answer.oneWayInterviewAnswerId;

    this.owiService.addOneWayInterviewAnswerComment(commentObj).subscribe((x) => {

    });

    if (!this.answer.answerComments)
      this.answer.answerComments = new Array<OneWayInterViewAnswerCommentList>();

    this.answer.answerComments.push({
      "commentText": commentObj.commentText,
      "commentedBy": this.authenticationService.currentUserValue.firstName
    } as OneWayInterViewAnswerCommentList);

    this.comment = '';
  }

}
