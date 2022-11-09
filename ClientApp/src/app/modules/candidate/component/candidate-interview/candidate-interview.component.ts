import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import { OneWayInterviewService } from 'src/app/_services';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-interview',
  templateUrl: './candidate-interview.component.html',
  styleUrls: ['./candidate-interview.component.css']
})
export class CandidateInterviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService,
    private oneWayInterviewService: OneWayInterviewService,
    private router:Router) { }
  isStart : boolean= false;
  checboxCount: number = 0;
  candidateFilter : candidatefilter = {};
  oneWayInterviewUpdateStatusInput : OneWayInterviewUpdateStatusInput = new OneWayInterviewUpdateStatusInput();
  blocked: boolean = false;
  candidiateRequisition : any;
  requisitionUUID: any;
  requisitionCandidateID: any;

  ngOnInit(): void {
    this.requisitionUUID =this.route.snapshot.params['requisitionUUID'];
    this.requisitionCandidateID =this.route.snapshot.params['requisitionCandidateID'];

    this. getMediaDevices();

    if(this.requisitionCandidateID != "null" && this.requisitionCandidateID != undefined){
        this.candidateFilter.requisitionUUID = this.route.snapshot.params['requisitionUUID'];
        this.candidateFilter.candidateUserId = this.route.snapshot.params['requisitionCandidateID'];
        console.log('i am here');
        this.getCandidateRequisition();
    }else{
      this.isStart = false;
      this.candidiateRequisition = {'requisitionInterviewRequestID' : "null"};
      console.log(this.candidiateRequisition);
      this.blocked = false;
    }
  }

  getCandidateRequisition(){
    this.blocked = true;
    this.candidateService.getCandidateRequisitionById(this.candidateFilter).subscribe((res) => {
      if(res?.success){
        this.candidiateRequisition  = res?.data;
      }
      this.blocked = false;
  });
  }

  getMediaDevices(){
    var constraints = {
      audio: true,
      video: { width: 1280, height: 720 }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(
      function(stream) {
        if (stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0) {
          //code for when none of the devices are available
          $("#spnAudioAvailability").html("<i class='bx bxs-microphone'></i> Available").removeClass("bg-secondary").addClass("bg-success");
          $("#spnVideoAvailability").html("<i class='bx bxs-video'></i> Available").removeClass("bg-secondary").addClass("bg-success");
        } else {
          // code for when both devices are available
          $("#spnAudioAvailability").html("<i class='bx bxs-microphone'></i> Not Available").removeClass("bg-secondary").addClass("bg-danger");
          $("#spnVideoAvailability").html("<i class='bx bxs-video'></i> Not Available").removeClass("bg-secondary").addClass("bg-danger");

        }
      }).catch(
      function(error) {
        if (error.toString().indexOf("NotAllowedError") >= 0) {

          $("#spnAudioAvailability").html("<i class='bx bxs-microphone'></i> Not Allowed").removeClass("bg-secondary").addClass("bg-danger");
          $("#spnVideoAvailability").html("<i class='bx bxs-video'></i> Not Allowed").removeClass("bg-secondary").addClass("bg-danger");
        } else {

          $("#spnAudioAvailability").html("<i class='bx bxs-microphone'></i> Error").removeClass("bg-secondary").addClass("bg-danger");
          $("#spnVideoAvailability").html("<i class='bx bxs-video'></i> Error").removeClass("bg-secondary").addClass("bg-danger");
        }
      });
  }

  oneWayInterviewStarted(){

    if(this.candidiateRequisition.requisitionInterviewRequestID == 0){
      this.router.navigate(['candidate/one-way-interview-started']);
    }
    else{
    this.blocked = true;
    this.oneWayInterviewUpdateStatusInput.requisitionCandidateId= this.requisitionCandidateID,
    this.oneWayInterviewService.updateOneWayInterviewStatus(this.oneWayInterviewUpdateStatusInput).subscribe((res) => {
      if(res?.success){
        this.router.navigate(['candidate/one-way-interview-started',this.requisitionUUID,
        this.requisitionCandidateID,this.candidiateRequisition.requisitionInterviewRequestID]);
      }
      this.blocked = false;
      });
    }
  }

  checkCheckBoxValue(event: any){
    if(event.target.checked){
      this.checboxCount +=1;
    }
    else{
      this.checboxCount -= 1;
    }

    if(this.checboxCount == 3){
      this.isStart = true;
    }
    else{
      this.isStart = false;
    }
  }


}
