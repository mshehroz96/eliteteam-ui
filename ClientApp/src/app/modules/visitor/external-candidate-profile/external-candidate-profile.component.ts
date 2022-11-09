import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILES_PATHS } from 'src/app';
import { UserProfileInput } from 'src/app/_models/showcase/showcase';
import { CommonService, ShowcaseService } from 'src/app/_services';


@Component({
  selector: 'app-external-candidate-profile',
  templateUrl: './external-candidate-profile.component.html',
  styleUrls: ['./external-candidate-profile.component.css']
})
export class ExternalCandidateProfileComponent implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer:any;
  request: UserProfileInput = new UserProfileInput();

  constructor(private route: ActivatedRoute,private showCaseService : ShowcaseService,
    private elRef: ElementRef,private commonService : CommonService) { }
  userId : number = 0;
  user:any;
  videUrl : any;
  questionText : any;
  showcaseTitle: any;
  blocked : boolean= false;
  lockedResumeFileName: any;
  resumeURL : any;
  ngOnInit(): void {
    this.userId =  this.route.snapshot.params['id'];
    this.showcaseTitle =this.route.snapshot.params['title'];
    this.getUserProfileData();
  }

  getUserProfileData(){
    this.blocked = true;
    this.request.userId = this.userId;
    this.showCaseService.getExternalUserProfile(this.request).subscribe((res) => {
      console.log(res?.data);
      if(res?.success){
        this.user = res?.data;
        this.lockedResumeFileName = res?.data.lockedResumeFileName;

        if(this.lockedResumeFileName != null || this.lockedResumeFileName != ''){
          this.resumeURL = FILES_PATHS.MAP_DOWNLOAD_USER_RESUME_LOCKED(this.user.lockedResumeFileName);

          this.commonService.downloadFile(this.resumeURL).subscribe((res:any)=>{
            this.pdfViewer.pdfSrc = res;
            this.pdfViewer.refresh();
          });
        }

      }
      this.blocked = false;
    });
  }

  ngAfterViewInit(){
    if(this.user.oneWayInterViewAnswerList.length > 0){
      this.createVideoUrl(this.user.oneWayInterViewAnswerList[0]);
    }
  }

  createVideoUrl(item:any){
    this.questionText = item.questionText;
    this.videUrl = FILES_PATHS.MAP_ONEWAY_INTERVIEWS(item.answerVideoFileName);
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();

  }

}
