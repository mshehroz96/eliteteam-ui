import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { InterviewFeedBack, InterviewRating,RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';
import { ApplicantProfileDataFilter, ApplicantProfileData } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { AuthenticationService, ChatService, CommonService, RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-live-interview',
  templateUrl: './live-interview.component.html',
  styleUrls: ['./live-interview.component.css']
})
export class LiveInterviewComponent implements OnInit {

  request!: ApplicantProfileDataFilter;
  candidate!: RequisitionCandidate;
  applicantProfileData!: ApplicantProfileData;
  applicantEncryptedId: string = '';
  totalRecords: number = 0;
  first: number = 0;
  eventId:number=0;
  
  start:boolean=false;
  interview?: any;
  interviewFeedBack!: InterviewFeedBack;
  submitted:boolean=false;
  constructor(

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
    this.eventId = Number(this.route.snapshot.params['eventId']);
    this.request.applicantId = Number(atob(this.applicantEncryptedId));

    this.interviewFeedBack=new InterviewFeedBack();
    this.interviewFeedBack.requisitionInterviewRequestId = Number(this.route.snapshot.params['requestId']);

  }

  ngOnInit() {

    if (this.request.applicantId) {
      this.getInterviewCompetencyList();
      this.getApplicantProfileData();
      this.getInterviewDetails();
    }
  }

  getInterviewCompetencyList()
  {
    this.interviewFeedBack.competencyRating=new  Array<InterviewRating>();

    this.recruitmentService.getInterviewFeedback(this.interviewFeedBack.requisitionInterviewRequestId).subscribe((res) => {
      if (res.success) {
        this.interviewFeedBack=res.data;
        this.submitted=this.interviewFeedBack.comment.length>0;
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

  getApplicantProfileData()
  {
    this.loadingService.doLoading(
      this.recruitmentService.getApplicantProfileData(this.request), this
    ).subscribe((res) => {
      if (res.success) {
        this.applicantProfileData = res.data;
        this.first = this.applicantProfileData.candidates.findIndex((x) => x.applicantId == this.request.applicantId);
        this.candidate = this.applicantProfileData.candidates[this.first] ?? new RequisitionCandidate();
        this.start = true;
      }
    }); 
  }

  saveInterviewFeedback()
  {
    this.loadingService.doLoading(this.recruitmentService.InterviewFeedback(this.interviewFeedBack), this).subscribe((res) => {
        this.submitted=true;
    });
  }
}
