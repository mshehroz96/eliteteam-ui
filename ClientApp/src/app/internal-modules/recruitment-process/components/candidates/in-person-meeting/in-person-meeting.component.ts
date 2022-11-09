import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { FILES_PATHS, LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { InterviewFeedBack, InterviewRating, RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';
import { ApplicantProfileDataFilter, ApplicantProfileData, RequisitionApplicantStatus } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { AuthenticationService, ChatService, CommonService, RecruitmentService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-in-person-meeting',
  templateUrl: './in-person-meeting.component.html',
  styleUrls: ['./in-person-meeting.component.css']
})
export class InPersonMeetingComponent implements OnInit {

  @ViewChild('embResume') public embResume:any;
  request!: ApplicantProfileDataFilter;
  candidate!: RequisitionCandidate;
  applicantProfileData!: ApplicantProfileData;
  applicantEncryptedId: string = '';
  totalRecords: number = 0;
  first: number = 0;
  eventId: number = 0;

  
  start: boolean = false;
  interview?: any;
  interviewFeedBack!: InterviewFeedBack;
  submitted: boolean = false;
  constructor(

    private commonService: CommonService,
    private authenticationService: AuthenticationService,
    public loadingService: LoadingService,
    private recruitmentService: RecruitmentService,
    private dialogService: DialogService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router) {

    this.request = new ApplicantProfileDataFilter();
    this.applicantProfileData = new ApplicantProfileData();
    this.interviewFeedBack = new InterviewFeedBack();
  }

  ngOnInit() {

    
    this.applicantEncryptedId = this.route.snapshot.params['id'];
    this.eventId = Number(this.route.snapshot.params['eventId']);
    this.request.applicantId = Number(atob(this.applicantEncryptedId));

    
    this.interviewFeedBack.requisitionInterviewRequestId = Number(this.route.snapshot.params['requestId']);


    if (this.request.applicantId) {
      this.getInterviewCompetencyList();
      this.getCandidateProfileData();
      this.getInterviewDetails();
    }
  }

  getInterviewCompetencyList() {
    this.interviewFeedBack.competencyRating = new Array<InterviewRating>();

    this.recruitmentService.getInterviewFeedback(this.interviewFeedBack.requisitionInterviewRequestId).subscribe((res) => {
      if (res.success) {
        this.interviewFeedBack = res.data;
        this.submitted = this.interviewFeedBack.comment.length > 0;
      }
    });
  }
  getInterviewDetails() {

    this.recruitmentService.getApplicantInterViewDetails(this.request.applicantId).subscribe((res) => {
      if (res.success) {
        this.interview = res?.data;
      }
    });
  }

  updateInterviewStatus(status:string){

    let applicantStatus = new RequisitionApplicantStatus();
    applicantStatus.applicantId = this.request.applicantId;
    applicantStatus.status = status;

    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to complete interview',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Complete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingService.doLoading(
          this.recruitmentService.updateRequisitionApplicantStatus(applicantStatus), this).subscribe((res) => {
            if (res.success) 
            {
              window.location.reload();
            }
          });
      }
    });
  }

  getCandidateProfileData() {
    this.loadingService.doLoading(
      this.recruitmentService.getCandidateProfileData(this.request), this
    ).subscribe((res) => {
      if (res.success) {
        this.applicantProfileData = res.data;
        this.first = this.applicantProfileData.candidates.findIndex((x) => x.applicantId == this.request.applicantId);
        this.candidate = this.applicantProfileData.candidates[this.first] ?? new RequisitionCandidate();
        this.start = true;
        if(this.candidate.isUnlocked)
         {
          this.embResume.src = FILES_PATHS.MAP_USER_RESUME_UNLOCKED(this.candidate.resumeFileName)
          this.embResume.load();
         }
        else{

          this.embResume.src = FILES_PATHS.MAP_USER_RESUME_LOCKED(this.candidate.resumeFileName)
          this.embResume.load();
        }
      }
    });
  }

  saveInterviewFeedback() {
    this.loadingService.doLoading(this.recruitmentService.InterviewFeedback(this.interviewFeedBack), this).subscribe((res) => {
      this.submitted = true;
    });
  }
}
