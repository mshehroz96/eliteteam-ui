import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { ApplicantProfileData } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { AuthenticationService } from 'src/app/_services';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';
import {ChatService} from './../../../../_services/chat/chat.service';
@Component({
  selector: 'app-candidate-job-detail',
  templateUrl: './candidate-job-detail.component.html',
  styleUrls: ['./candidate-job-detail.component.css']
})
export class CandidateJobDetailComponent implements OnInit {

  constructor(private chatService: ChatService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,private candidateService : CandidateService,
    private router:Router) { }

  blocked: boolean = false;
  requisitionUUID: any;
  requisitionCandidateID: any;
  candidiateRequisition : any;
  candidateFilter : candidatefilter = {};
  activityList: any[] = [];
  isReviewOffer : boolean = false;
  user : any = { 'userId' : 0,  'type' : ''  , 'requisitionId' : 0 , jobTitle: '' , requisitionCandidateID: 0};
  cancelationReason: any;
  isselectInterviewTime : boolean = false;
  isCancelInterview: boolean = false;
  updateCandidateStatusInput : OneWayInterviewUpdateStatusInput = new OneWayInterviewUpdateStatusInput();
  userType: string = "";
  isVideoInterview : boolean = false;
  userId:number = 0;
  ngOnInit(): void {
    this.requisitionUUID =this.route.snapshot.params['requisitionUUID'];
    this.requisitionCandidateID =this.route.snapshot.params['requisitionCandidateID'];
    this. getCandidateRequisition();
    this.userId = this.auth.currentUserValue.userId;
  }

  getCandidateRequisition(){
    this.candidateFilter.requisitionUUID = this.route.snapshot.params['requisitionUUID'];
    this.candidateFilter.candidateUserId = this.route.snapshot.params['requisitionCandidateID'];
    this.blocked = true;
    this.candidateService.getCandidateRequisitionById(this.candidateFilter).subscribe((res) => {
      if(res?.success){
        this.candidiateRequisition  = res?.data;
        this.activityList = res?.data.activityList;
        console.log(res?.data);
        this.configureChat();
      }
      this.blocked = false;
      
  });
  }

  private configureChat()
  {
    let user = new ChatUser();

    user.userId = 5;
    user.firstName = 'Admam';
    user.lastName = 'Rehman';
    let requisition=new ChatRequisition();
    requisition.requisitionId= this.candidiateRequisition.requisitionID;
    this.chatService.channelType = 1;
    this.chatService.setJoinChat(user, requisition);
  }

  hideAndShowScheduleButton(item:any): boolean
  {
    if(item.candidateStatus == 'Client Zoom Interview Requested'
    || item.candidateStatus =='Recruiter Zoom Interview Requested'){
      return true;
    }
    return false;
  }


  hideAndShowZoomOneWayInterView(item:any): boolean{
    if(item.candidateStatus == 'Client Zoom Interview Scheduled' || item.candidateStatus == 'Recruiter Zoom Interview Scheduled'
    || item.candidateStatus == 'Rescheduled Candidate Zoom Interview'){
      return true;
    }
    return false;
  }

  hideAndShowOneWayInterView(item:any): boolean{
    if(item.candidateStatus == 'One-Way Interview Requested'){
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

  selectInterViewDateTime(item: any){
    if(item.candidateStatus =='Recruiter Zoom Interview Requested' || 'Recruiter Zoom Interview Scheduled'){
      this.user.userId =item.recruiterID;
      this.user.type ='Recruiter';
    }
    else if(item.candidateStatus == 'Client Zoom Interview Scheduled' || item.candidateStatus == 'Client Zoom Interview Requested'){
      this.user.userId =item.clientId;
      this.user.type ='Client';
    }

    this.user.jobTitle = item.jobTitle;
    this.user.schedulingType = item.schedulingType;
    this.user.eventId = item.eventId;
    this.user.requisitionId = item.requisitionID;
    this.user.requisitionInterviewRequestID= item.requisitionInterviewRequestID
    this.user.requisitionCandidateID = item.requisitionCandidateID;
    this.isselectInterviewTime = true;
  }

  cancelInterviewPopup(item: any){
    this.cancelationReason = "";
    if(this.isCancelInterview){
      this.isCancelInterview = false;
    }
    else{
      this.isCancelInterview = true;
    }

    this.updateCandidateStatusInput.requisitionUUID = item.requisitionUUID;
     this.updateCandidateStatusInput.requisitionInterviewRequestID = item.requisitionInterviewRequestID;
    this.updateCandidateStatusInput.candidateUserId = item.requisitionCandidateID;
    this.updateCandidateStatusInput.eventId = item.eventId;
    this.userType = item.type;

  }

  hideCalendar(item:any){
    this.isselectInterviewTime = false;
    this.getCandidateRequisition();
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
    }else{
      this.updateCandidateStatusInput.requisitionCandidateStatusLIID = 408;
    }

    this.candidateService.updateCandidateInterviewCanceledStatus(this.updateCandidateStatusInput)
    .subscribe((res: any) => {
      this.isCancelInterview = false;
      this.router.navigate(['candidate/dashboard']);
      this.blocked = false;
      Swal.fire({
        icon: 'success',
        title: "Interview Cancelled",
        text: "The Interview is cancelled succesfully for selected job title.",
      });

    });
  }

}
