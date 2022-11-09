import { AuthenticationService } from './../../../../_services/authentication/authentication.service';
import { candidatefilter } from './../../../../_models/client/candidatefilter';
import { CandidateService } from './../../../../_services/candidate/candidate.service';
import { Component, OnInit } from '@angular/core';
import { OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private candidateService : CandidateService,
    private oneWayInterviewService : OneWayInterviewService,
    private authenticateService: AuthenticationService
  ) { }
  basicData: any;
  isAwaiting: boolean = true;
  isPending: boolean = false;
  chartOptions: any;
  doughnutChartOptions: any;
  data: any;
  isselectInterviewTime : boolean = false;
  isReviewOffer : boolean = false;
  isVideoInterview : boolean = false;
  requisitionId: any;
  candidateFilter : candidatefilter = {};
  awaitingMyActions: any[]= [];
  pendings: any[]= [];
  blocked : boolean = false;
  isCancelInterview: boolean= false;
  cancelationReason: string= "";
  updateCandidateStatusInput : OneWayInterviewUpdateStatusInput = new OneWayInterviewUpdateStatusInput();
  user : any = { 'userId' : 0,  'type' : ''  , 'requisitionId' : 0 , jobTitle: '' , requisitionCandidateID: 0};
  userType: string = "";
  isUserOneWayInterviewCompleted: boolean = false;
  isAvatarFileNameExist : boolean= false;
  isCandidateJobs : boolean = false;

  awaitingmyactionMessage : string = '';
  pendingWithRecruiterMessage : string = '';
  startOneWayInterview: string = 'Start One-Way Interview';

  ngOnInit(): void {

    this. getChartData();
    this.getDashboardData();
  }

  getDashboardData(){
    this.blocked = true;
    this.candidateFilter.candidateUserId = 0;
    this.candidateFilter.requisitionUUID = "";
    this.candidateService.getCandidateDashboard(this.candidateFilter).subscribe((res) => {
        if(res?.success){
          console.log(res.data);
          this.awaitingMyActions = res.data.awaitingMyActions;
          this.pendings = res.data.pendings;

          if(this.awaitingMyActions.length == 0){
            this.awaitingmyactionMessage = 'There are currently no jobs that are awaiting your action';
          }

          if(this.pendings.length == 0){
            this.pendingWithRecruiterMessage ='There are currently no jobs that are pending with recruiter/client';
          }

          this.isUserOneWayInterviewCompleted = res.data.isCandiateOneWayInterView;

          if(res.data.isCandiateOneWayInterView == false){
            $("#CandidateDefaultInterview").removeClass("d-none");
          }

          if(res.data.avatarFileName == 'user_avatar_blank.png'
          || res.data.avatarFileName == null){
            $("#defaultImage").removeClass("d-none");
          }
        }
        this.isCandidateJobs = true;
        this.blocked = false;
    });
  }

  getChartData(){
    this.basicData = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S','S'],
      legend:{display: false},
      datasets: [
          {
              backgroundColor: '#486E8E',
              data: [7, 8, 15, 12, 13, 14, 15]
          },

      ]
  };



  this.chartOptions =  {
    borderRadius: 3,
    plugins: {
      legend: {
          display: false
      },
   },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },

        ticks: {
          display: false
        },

      }
    },

  }
  this.data = {
    datasets: [
        {
            data: [78,22],
            backgroundColor: [
                "#84E053",
                "#CCC"
            ]
        }
    ]
  };

  this.doughnutChartOptions =  {
    cutout: 45
  }
  }
  activeAwaiting (){
    this.isPending = false;
    this.isAwaiting = true;
  }
  activePending (){
    this.isAwaiting = false;
    this.isPending = true;
  }

  cancelInterviewPopup(item: any){
    this.cancelationReason = "";
    if(this.isCancelInterview){
      this.isCancelInterview = false;
    }
    else{
      this.isCancelInterview = true;
    }


    if(item.candidateStatus =='Recruiter Zoom Interview Requested' || item.candidateStatus =='Recruiter Zoom Interview Scheduled'){
      this.userType ='Recruiter';
    }
    else if(item.candidateStatus =='Client In-Person Interview Scheduled'){
      this.userType ='InPerson';
    }
    else if(item.candidateStatus == 'Client Zoom Interview Scheduled' || item.candidateStatus == 'Client Zoom Interview Requested'){
      this.userType ='Client';
    }


    this.updateCandidateStatusInput.requisitionUUID = item.requisitionUUID;
    this.updateCandidateStatusInput.requisitionInterviewRequestID = item.requisitionInterviewRequestID;
    this.updateCandidateStatusInput.requisitionCandidateId = item.requisitionCandidateID;
    this.updateCandidateStatusInput.eventId = item.eventId;
  }

  updateCancelInterviewStatus(){

    if(this.cancelationReason == '' || this.cancelationReason == null){
      Swal.fire({
        icon: 'error',
        title: "Cancellation Reason Required!",

      });
      return;
    }



    this.blocked = true;
    this.updateCandidateStatusInput.cancelationReason = this.cancelationReason;

    if(this.userType == "Recruiter"){
      this.updateCandidateStatusInput.requisitionCandidateStatusLIID = 407;
    }
    else if(this.userType == "InPerson"){
      this.updateCandidateStatusInput.requisitionCandidateStatusLIID = 462;
    }
    else{
      this.updateCandidateStatusInput.requisitionCandidateStatusLIID = 408;
    }

    this.candidateService.updateCandidateInterviewCanceledStatus(this.updateCandidateStatusInput)
    .subscribe((res: any) => {
      this.getDashboardData();
      this.isCancelInterview = false;
      this.blocked = false;
      Swal.fire({
        icon: 'success',
        title: "Interview Cancelled",
        text: "The Interview is cancelled succesfully for selected job title.",
      });

    });
  }


  selectInterViewDateTime(item: any){
    if(item.candidateStatus =='Recruiter Zoom Interview Requested' || item.candidateStatus =='Recruiter Zoom Interview Scheduled'){
      this.user.userId = item.recruiterID;
      this.user.type ='Recruiter';
    }
    else if(item.candidateStatus =='Client In-Person Interview Requested'){
      this.user.userId = item.recruiterID;
      this.user.type ='InPerson';
    }
    else if(item.candidateStatus == 'Client Zoom Interview Scheduled' || item.candidateStatus == 'Client Zoom Interview Requested'){
      this.user.userId =item.clientId;
      this.user.type ='Client';
    }

    this.user.recruiterId = item.recruiterID;

    this.user.jobTitle = item.jobTitle;
    this.user.schedulingType = item.schedulingType;
    this.user.eventId = item.eventId;
    this.user.requisitionId = item.requisitionID;
    this.user.requisitionInterviewRequestID= item.requisitionInterviewRequestID
    this.user.requisitionCandidateID = item.requisitionCandidateID;
    this.user.requisitionInterviewRequestID = item.requisitionInterviewRequestID;
    this.isselectInterviewTime = true;
  }

  showVideoInterView(){
    this.isVideoInterview= true;
  }

  reviewOffer(item: any){
    this.isReviewOffer = true;
    this.requisitionId = item.requisitionID

  }

  hideAndShowTimeline(item:any): boolean{

    if(item.candidateStatus == 'One-Way Interview Requested' || item.candidateStatus == 'Recruiter Zoom Interview Requested'){
      return true;
    }

    return false;
  }

  hideAndShowScheduleButton(item:any): boolean
  {
    if(item.candidateStatus == 'Client Zoom Interview Requested'
    || item.candidateStatus =='Recruiter Zoom Interview Requested' || item.candidateStatus == 'Client In-Person Interview Requested'){
      return true;
    }
    return false;
  }

  hideAndShowZoomOneWayInterView(item:any): boolean{
    if(item.candidateStatus == 'Client Zoom Interview Scheduled' || item.candidateStatus == 'Recruiter Zoom Interview Scheduled'
    || item.candidateStatus == 'Rescheduled Candidate Zoom Interview' || item.candidateStatus == 'Client In-Person Interview Scheduled'){
      return true;
    }
    return false;
  }

  hideAndShowZoomOneWayInterViewRejoin(item:any): boolean{

    if(item.candidateStatus == 'Recruiter Zoom Interview Started' || item.candidateStatus == 'Client Zoom Interview Started'){
      return true;
    }
    return false;
  }

  hideAndShowOneWayInterView(item:any): boolean{
    if(item.candidateStatus == 'One-Way Interview Requested' || item.candidateStatus == 'One-Way Interview Pending'){

      if(item.candidateStatus == 'One-Way Interview Pending'){
        this.startOneWayInterview = 'Continue Interview';
      }
      return true;
    }
    return false;
  }

  hideAndShowOfferButton(item:any): boolean{
    if(item.candidateStatus == 'Client Offer Sent'){
      return true;
    }
    return false;
  }

  hideOffer(){
    this.isReviewOffer = false;
    this.getDashboardData();
  }

  hideCalendar(item:any){
    this.isselectInterviewTime = false;
    this.getDashboardData();
  }
}
