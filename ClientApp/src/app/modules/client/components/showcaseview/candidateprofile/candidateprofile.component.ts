import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { candidateBasicInfofilter } from 'src/app/_models/client/candidatefilter';
import { ChatService, CommonService, UserService } from 'src/app/_services';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';

@Component({
  selector: 'app-candidateprofile',
  templateUrl: './candidateprofile.component.html',
  styleUrls: ['./candidateprofile.component.css']
})
export class CandidateprofileComponent implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer:any;
  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService,
    public loadingService: LoadingService,private chatService: ChatService,
    private userService : UserService,private commonService:CommonService,) { }

  candidateUserId : number = 0;
  candidateInfo: any = {};
  onewayInterviewAnswers : any[] = [];
  candidateBasicInfoFilter : candidateBasicInfofilter = {};
  blocked: boolean = false;
  products: [] = [];
  candidateStats: any = {};
  candidateRequisitions: any[] = [];
  selectedAnswer:any;
  resumeURL: any = "";
  ngOnInit(): void {
    this.candidateBasicInfoFilter.candidateUserId =this.route.snapshot.params['id'];
    this.candidateBasicInfoFilter.candidateCVId =0;
    this.getCandidateBasicInfo();
  }

  // ngAfterViewInit(): void {

  //   alert(this.resumeURL);



  // }

  getCandidateBasicInfo(){
    this.loadingService.doLoading(
      this.candidateService.getCandidateBasicInfo(this.candidateBasicInfoFilter), this
    ).subscribe((res) => {
      if (res.success) {
        if(res?.success){
          console.log(res?.data);
          this.candidateInfo  = res?.data.candidateBasicInfo;
          this.onewayInterviewAnswers = res?.data.candidateOneWayInterviews;
          this.candidateStats = res?.data.candidateStats;
          this.candidateRequisitions= res?.data.candidateRequisitions;
          this.candidateInfo.hideAccountButton = false;

          if(this.candidateInfo.lockedResumeFileName != null || this.candidateInfo.lockedResumeFileName != ''){
            this.resumeURL = FILES_PATHS.MAP_DOWNLOAD_USER_RESUME_LOCKED(this.candidateInfo.lockedResumeFileName);

            this.commonService.downloadFile(this.resumeURL).subscribe((res:any)=>{
              this.pdfViewer.pdfSrc = res;
              this.pdfViewer.refresh();
            });
           }

          this.configureChat();
        }
      }
      });
    }

    private configureChat()
    {
      this.loadingService.doLoading(
        this.userService.getCompanyPrimaryRecruiterDetail(), this
      ).subscribe((res) => {
        let user = new ChatUser();

        user.userId = res?.data.userId;
        user.firstName = res?.data.firstName;
        user.lastName = res?.data.lastName;
        let requisition=new ChatRequisition();

        requisition.requisitionId= 0;
        this.chatService.channelType = 1;
        this.chatService.setJoinChat(user, requisition);
      });

    }

    showAnswerDetails(item:any){
      this.selectedAnswer = item;
    }
}
