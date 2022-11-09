import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { CancelInterviewComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/cancel-interview/cancel-interview.component';
import { InterviewInviteComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/interview-invite/interview-invite.component';
import { QualifyCandidateComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/qualify-candidate/qualify-candidate.component';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { OneWayInterViewAnswerList } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';
import { ApplicantProfileData, ApplicantProfileDataFilter, RequisitionApplicantStatus } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { AuthenticationService, ChatService, CommonService } from 'src/app/_services';
import { RecruitmentService } from 'src/app/_services/recruitment/recruitment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.css']
})
export class ApplicantProfileComponent implements OnInit {
  @ViewChild('pdfViewer') public pdfViewer:any;

  request!: ApplicantProfileDataFilter;
  candidate!:RequisitionCandidate;
  applicantProfileData!: ApplicantProfileData;
  applicantEncryptedId: string = '';
  totalRecords: number = 0;
  first: number = 0;
  selectedAnswer!:OneWayInterViewAnswerList;
  ref!: DynamicDialogRef;
  resumeURL:string='';
  constructor(

    private authenticationService:AuthenticationService,
    public loadingService: LoadingService,
    private commonService:CommonService,
    private recruitmentService: RecruitmentService,
    private dialogService: DialogService,
    private chatService:ChatService,
    private route: ActivatedRoute,
    private router: Router) {


    this.request=new ApplicantProfileDataFilter();
    this.applicantProfileData = new ApplicantProfileData();
    this.applicantEncryptedId = this.route.snapshot.params['id'];
    this.first = Number(this.route.snapshot.params['index']);
    this.request.applicantId = Number(atob(this.applicantEncryptedId));
  }

  ngAfterViewInit(): void {

    this.commonService.downloadFile(this.resumeURL).subscribe((res:any)=>{
      this.pdfViewer.pdfSrc = res;
      this.pdfViewer.refresh();
    });


  }
  ngOnInit(): void {

    if (this.request.applicantId) {
      this.getApplicantProfileData();
    }
  }

  interviewInvite() {

    this.ref = this.dialogService.open(InterviewInviteComponent, {
      header: 'Invite Applicant',
      data: {
        id:this.candidate.applicantId,
        campaignType:this.candidate.campaignType,
        requisitionId:this.applicantProfileData.requisitionDetails.uuid,
        oneWayInterviewTemplateId:this.applicantProfileData.requisitionDetails.jobTitle.oneWayInterviewTemplateId
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.goBack();
      }

    })
  }

  goBack() {
    this.router.navigateByUrl('/recruiter/jobs-active/job-details/' + this.applicantProfileData.requisitionDetails.uuid);
  }
  cancelInterView() {

    this.ref = this.dialogService.open(CancelInterviewComponent, {
      header: 'Cancel Interview',
      width: '70%',
      data: {
        id: this.candidate.applicantId
      },
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.goBack();
      }
    })

  }
  ngOnDestroy():void
  {
      this.chatService.setJoinChat(new ChatUser(), new ChatRequisition());
  }

  getApplicantProfileData() {

    this.loadingService.doLoading(
      this.recruitmentService.getApplicantProfileData(this.request), this
    ).subscribe((res) => {
      if (res.success) {

        this.applicantProfileData = res.data;
        this.first = this.applicantProfileData.candidates.findIndex((x)=>x.applicantId==this.request.applicantId);
        this.candidate = this.applicantProfileData.candidates[this.first] ?? new RequisitionCandidate();

        console.log(this.applicantProfileData.applicantDetails.unlockedResumeFileName);

        this.resumeURL = FILES_PATHS.MAP_DOWNLOAD_USER_RESUME_UNLOCKED(this.applicantProfileData.applicantDetails.unlockedResumeFileName);


        this.totalRecords = res.totalRecords;

        this.configureChat();

      }
    });
  }
  private configureChat()
  {
    let user = new ChatUser();
    user.userId = this.applicantProfileData.applicantDetails.userId;
    user.firstName = this.applicantProfileData.applicantDetails.firstName ?? "";
    user.lastName = this.applicantProfileData.applicantDetails.lastName ?? "";

    let requisition=new ChatRequisition();
    requisition.requisitionId=this.applicantProfileData.requisitionDetails.requisitionId;

    this.chatService.channelType = 1;
    this.chatService.setJoinChat(user,requisition);

  }

  showAnswerDetails(answer:OneWayInterViewAnswerList){

    if (answer && answer.answerRatings) {

      let rating = answer.answerRatings.find(x => x.createdBy == this.authenticationService.currentUserValue.userId);
      if (rating) {
        answer.userRating = rating.rating ?? 0;
      }
    }

    this.selectedAnswer=answer;

  }
  disQualify() {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure you want to disqualify this applicant?',
      icon: 'question',
      showCancelButton: true,
      customClass: { confirmButton:"disqualify"},
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {

        let applicantStatus = new RequisitionApplicantStatus();
        applicantStatus.applicantId=this.request.applicantId;
        applicantStatus.status='Disqualify';

        this.recruitmentService.updateRequisitionApplicantStatus(applicantStatus).subscribe((x)=>{
          this.candidateDisQualified();
        });
      }
    });
  }

  qualify() {


    this.ref = this.dialogService.open(QualifyCandidateComponent, {
      header: 'Qualify Candidate',
      width: '70%',
      data: {
        id: this.candidate.applicantId
      },
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.goBack();
      }
    });
  }

  onCandidateChange(index:number)
  {
    if (this.applicantProfileData.candidates[index])
    {

      let candid=this.applicantProfileData.candidates[index];

      // this.router.navigate([candid.profileUrl]);

      // this.request.applicantId=candid.applicantId;

      // this.first=index;

      // this.selectedAnswer=new OneWayInterViewAnswerList();

      // this.getApplicantProfileData();

      this.redirectTo(candid.profileUrl);

    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() =>
      this.router.navigate([uri]));
  }

  candidateDisQualified()
  {
    Swal.fire({
      title: 'Applicant Disqualified',
      text: 'The applicant was disqualified successfully.',
      icon: 'success',
    });
    this.goBack();
  }

}
