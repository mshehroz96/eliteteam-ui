import { PaymentComponent } from './../../../../_shared/payment/payment.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { CancelInterviewComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/cancel-interview/cancel-interview.component';
import { ClientInterviewInviteComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/client-interview-invite/client-interview-invite.component';
import { InterviewInviteComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/interview-invite/interview-invite.component';
import { SendOfferComponent } from 'src/app/internal-modules/recruitment-process/components/candidates/send-offer/send-offer.component';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { OneWayInterViewAnswerList } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';
import { ApplicantProfileData, ApplicantProfileDataFilter, RequisitionApplicantStatus } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { AuthenticationService, ChatService, CommonService } from 'src/app/_services';
import { RecruitmentService } from 'src/app/_services/recruitment/recruitment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit,AfterViewInit {

  @ViewChild('pdfViewer') public pdfViewer:any;
  request!: ApplicantProfileDataFilter;
  candidate!: RequisitionCandidate;
  applicantProfileData!: ApplicantProfileData;
  applicantEncryptedId: string = '';
  totalRecords: number = 0;
  first: number = 0;
  selectedAnswer!: OneWayInterViewAnswerList;
  ref!: DynamicDialogRef;
  resumeData: string = '';
  resumeURL:string='';
  isPayment: boolean= false;
  constructor(
    private el: ElementRef,
    private commonService:CommonService,
    private authenticationService: AuthenticationService,
    public loadingService: LoadingService,
    private recruitmentService: RecruitmentService,
    private dialogService: DialogService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router) {

    this.request = new ApplicantProfileDataFilter();
    this.applicantProfileData = new ApplicantProfileData();
    this.applicantEncryptedId = this.route.snapshot.params['id'];
    this.first = Number(this.route.snapshot.params['index']);
    this.request.applicantId = Number(atob(this.applicantEncryptedId));

  }
  ngAfterViewInit(): void {

    console.log(this.resumeURL);
    this.commonService.downloadFile(this.resumeURL).subscribe((res:any)=>{
      this.pdfViewer.pdfSrc = res;
      this.pdfViewer.refresh();
    });


  }
  ngOnInit(): void {

    if (this.request.applicantId) {
      this.getCandidateProfileData();
    }
  }

  sendOffer() {

    this.ref = this.dialogService.open(SendOfferComponent, {
      header: 'Send Offer',
      data: {
        id: this.candidate.applicantId,
        campaignType: this.candidate.campaignType,
        requisitionId: this.applicantProfileData.requisitionDetails.uuid
      },
      width: '70%',
      contentStyle: { "max-height": "650px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.goBack();
      }
    })

  }

  makepayment(){
    this.ref = this.dialogService.open(PaymentComponent, {
      header: 'Unlock Profile',
      data: {
        id: this.candidate.applicantId,
        campaignType: this.candidate.campaignType,
        requisitionId: this.applicantProfileData.requisitionDetails.uuid,
        oneWayInterviewTemplateId: this.applicantProfileData.requisitionDetails.jobTitle.oneWayInterviewTemplateId
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.goBack();
      }

    });
  }

  interviewInvite() {

    this.ref = this.dialogService.open(ClientInterviewInviteComponent, {
      header: 'UnLock Pr',
      data: {
        id: this.candidate.applicantId,
        campaignType: this.candidate.campaignType,
        requisitionId: this.applicantProfileData.requisitionDetails.uuid,
        oneWayInterviewTemplateId: this.applicantProfileData.requisitionDetails.jobTitle.oneWayInterviewTemplateId
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

  hireApplicant() {
    let applicantStatus = new RequisitionApplicantStatus();
    applicantStatus.applicantId = this.request.applicantId;
    applicantStatus.status = 'Hired';

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to hire this candidate!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Hire!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.doLoading(
          this.recruitmentService.updateRequisitionApplicantStatus(applicantStatus), this).subscribe((res) => {
            if (res.success) {
              this.goBack();
            }
          });
      }
    });

  }

  goBack() {
    this.router.navigateByUrl('/client/jobs/job-details/' + this.applicantProfileData.requisitionDetails.uuid);
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


  ngOnDestroy(): void {
    this.chatService.setJoinChat(new ChatUser(), new ChatRequisition());
  }

  getCandidateProfileData() {

    this.loadingService.doLoading(
      this.recruitmentService.getCandidateProfileData(this.request), this).subscribe((res) => {

        if (res.success) {

          this.applicantProfileData = res.data;
          this.first = this.applicantProfileData.candidates.findIndex((x) => x.applicantId == this.request.applicantId);
          this.candidate = this.applicantProfileData.candidates[this.first] ?? new RequisitionCandidate();
          this.totalRecords = res.totalRecords;

          if (this.candidate.isUnlocked) {
            this.resumeURL = FILES_PATHS.MAP_DOWNLOAD_USER_RESUME_UNLOCKED(this.candidate.resumeFileName);
          }
          else {

            this.resumeURL = FILES_PATHS.MAP_DOWNLOAD_USER_RESUME_LOCKED(this.candidate.resumeFileName);

          }

          this.configureChat();

        }
      })
  }





  private configureChat() {
    let user = new ChatUser();
    user.userId = this.applicantProfileData.applicantDetails.userId;
    user.firstName = this.applicantProfileData.applicantDetails.firstName ?? "";
    user.lastName = this.applicantProfileData.applicantDetails.lastName ?? "";

    let requisition = new ChatRequisition();
    requisition.requisitionId = this.applicantProfileData.requisitionDetails.requisitionId;

    this.chatService.channelType = 1;
    this.chatService.setJoinChat(user, requisition);

  }
  showAnswerDetails(answer: OneWayInterViewAnswerList) {
    if (answer && answer.answerRatings) {

      let rating = answer.answerRatings.find(x => x.createdBy == this.authenticationService.currentUserValue.userId);
      if (rating) {
        answer.userRating = rating.rating ?? 0;
      }
    }
    this.selectedAnswer = answer;
  }

  onCandidateChange(index: number) {
    if (this.applicantProfileData.candidates[index]) {
      let candid = this.applicantProfileData.candidates[index];
      this.router.navigate([candid.profileUrl]);
      this.request.applicantId = candid.applicantId;
      this.first = index;
      this.getCandidateProfileData();
    }
  }
}

