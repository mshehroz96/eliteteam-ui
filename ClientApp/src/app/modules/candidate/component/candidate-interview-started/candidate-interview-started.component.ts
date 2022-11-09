import { data } from 'jquery';
import { CommonService } from 'src/app/_services/common/common.service';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';
import { OneWayInterviewService, VideoRecordingService } from 'src/app/_services';
import { FILES_PATHS } from 'src/app';
import { ActivatedRoute, Router } from '@angular/router';
import { OneWayInterviewQuestionList, OneWayInterviewQuestionRequest } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterViewAnswerDto, OneWayInterviewUpdateStatusInput } from 'src/app/_models/one-way-interview/one-way-interview-answer';
import * as moment from 'moment';
import {isPlatformBrowser} from '@angular/common';



@Component({
  selector: 'app-candidate-interview-started',
  templateUrl: './candidate-interview-started.component.html',
  styleUrls: ['./candidate-interview-started.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CandidateInterviewStartedComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    // private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private videoRecordingService: VideoRecordingService,
    private candidateService: CandidateService,
    private commonService: CommonService,
    private oneWayInterviewService : OneWayInterviewService,
    private route: ActivatedRoute,
    private router:Router,
    @Inject(PLATFORM_ID) private _platform: Object
  ) {

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });

  }

//Time from Question
  intThinkTimeTotal : any = 0;
  intThinkTimeElapsed : any = 0;
  tmrTickThinkTime : any = null;

  //Time from Question
  intTimeLimitTotal : any = 0;
  intTimeLimitElapsed : any = 0;
  tmrTickTimeLimit : any = null;

  @ViewChild('videoElement') videoElement: any;
  video: any;

  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  videoRecordedTime: any;
  videoBlobUrl: any;
  videoBlob: any;
  videoName: any;
  videoStream!: MediaStream;
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true};
  blocked: boolean = false;
  requisitionUUID: string = '';
  requisitionCandidateId: any;
  requisitionInterviewRequestId: number= 0;
  reTakeAllowed: number = 0;
  reTakeCount: number = 0;
  reTakeList: any = [] = [];
  oneWayInterviewQuestionList :  OneWayInterviewQuestionList[] = [];
  oneWayInterviewQuestion : OneWayInterviewQuestionList = new OneWayInterviewQuestionList();
  oneWayInterviewAnser : OneWayInterViewAnswerDto = new OneWayInterViewAnswerDto();
  index : number = 0;
  totalQuestion : number = 0;
  questionText: any;
  nextButtonDisabled: boolean = false;
  updateCandidateStatusInput : OneWayInterviewUpdateStatusInput = new OneWayInterviewUpdateStatusInput();
  oneWayInterviewQuestionRequest :  OneWayInterviewQuestionRequest = new OneWayInterviewQuestionRequest();

  ngAfterViewInit (){
    // if(this.oneWayInterviewQuestionList.length > 0){
        this.video = this.videoElement.nativeElement;
        this.cameraPreview();
  }
  ngOnInit(){

    this.getInterviewQuestion();
  }

  cameraPreview(){
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({video: true}).then((ms: MediaStream) => {
        this.video.srcObject = ms;
        this.video.play();
      });
    }
  }

  getInterviewQuestion(){

    this.blocked = true;
    this.requisitionUUID =this.route.snapshot.params['requisitionUUID'];
    this.requisitionInterviewRequestId =this.route.snapshot.params['requisitionInterviewRequestId'];
    this.requisitionCandidateId =this.route.snapshot.params['requisitionCandidateID'];

    if(this.requisitionCandidateId == undefined){
      this.oneWayInterviewQuestionRequest.requisitionUuid = "Candidate";
      this.oneWayInterviewQuestionRequest.requisitionCandidateId = 0;
      this.requisitionCandidateId = 0;
    }
    else{
      this.oneWayInterviewQuestionRequest.requisitionUuid = this.requisitionUUID;
      this.oneWayInterviewQuestionRequest.requisitionCandidateId = this.requisitionCandidateId;
    }


    this.oneWayInterviewService.getOneWayInterviewQuestions(this.oneWayInterviewQuestionRequest)
    .subscribe((res: any) => {

        this.oneWayInterviewQuestionList = res?.data;
        if(this.oneWayInterviewQuestionList.length == 0){
          this.blocked = false;
        }else{
          this.totalQuestion =this.oneWayInterviewQuestionList.length;
          this.oneWayInterviewQuestion  = this.oneWayInterviewQuestionList[0];
          this.reTakeAllowed = this.oneWayInterviewQuestion.retakesAllowed;
          this.blocked = false;

          console.log(this.oneWayInterviewQuestionList);
        }


        if(this.oneWayInterviewQuestionList.length > 0)
        {
              this.addReTakeValue();
              this.tmrTickThinkTime = setInterval(() => {
                this.intThinkTimeTotal = moment.duration(this.oneWayInterviewQuestion.thinkTimeAllowed).asSeconds();
                this.intTimeLimitTotal = moment.duration(this.oneWayInterviewQuestion.timeAllowed).asSeconds();
                // this.intThinkTimeTotal = 2;
                // this.intTimeLimitTotal = 2;
                this.TickThinkTime();
              }, 1000);
        }


    });
  }

  nextQuestion() {
    this.blocked = true
    this.nextButtonDisabled = false;
    $("#divProgressTimeLimit").attr("style", "width: " + 0 + "%");
    $("#divProgressThinkTime").attr("style", "width: " + 0 + "%");
    $("#divProgressThinkTime").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    $("#divProgressThinkTime").addClass("progress");
    $("#spnThinkTimeRemaining").text('00:00');
    $("#spnTimeLimitRemaining").text('00:00');
    this.uploadVideo(this.videoBlob, 'video/mp4', this.videoName);
  }

  uploadVideo(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type }  );
      this.commonService.uploadFileWithFileName(blob, FILES_PATHS.UPLOAD_ONEWAY_INTERVIEWS,filename)
        .subscribe((res: any) => {
          this.saveQuestionAnswer(res?.data.name);
        });
  }

  addReTakeValue(){
    this.reTakeAllowed = this.oneWayInterviewQuestion.retakesAllowed;
    this.reTakeList = [];
      for (let r = 0; r < this.reTakeAllowed; r++) {
          this.reTakeList.push('bx bx-square');
      }
  }

  saveQuestionAnswer(fileName:any){

      this.oneWayInterviewQuestion  = this.oneWayInterviewQuestionList[this.index];

      this.oneWayInterviewAnser.requisitionCandidateId = this.requisitionCandidateId;
      this.oneWayInterviewAnser.requisitionOneWayInterviewQuestionId =this.oneWayInterviewQuestion.oneWayInterviewQuestionId;
      this.oneWayInterviewAnser.answerVideoFileName =fileName;
      this.oneWayInterviewAnser.candidateCvid = 0;
      this.oneWayInterviewAnser.thinkTimeTaken = this.oneWayInterviewQuestion.thinkTimeAllowed;
      this.oneWayInterviewAnser.timeTaken = this.oneWayInterviewQuestion.timeAllowed;
      this.oneWayInterviewAnser.retakesTaken = this.reTakeCount;


    this.oneWayInterviewService.saveInterviewQuestionAnswer(this.oneWayInterviewAnser)
    .subscribe((res: any) => {

      this.index ++;
      this.oneWayInterviewQuestion = this.oneWayInterviewQuestionList[this.index];
      if(this.index == this.totalQuestion){

        if(this.requisitionUUID == undefined){
          this.router.navigate(['candidate/oneway-interview-completed']);
        }
        this.updateCandidateStatusInput.requisitionCandidateStatusLIID = 269;
        this.updateCandidateStatusInput.requisitionUUID = this.requisitionUUID;
        this.updateCandidateStatusInput.candidateUserId = this.requisitionCandidateId;
        this.updateCandidateStatusInput.requisitionInterviewRequestID = this.requisitionInterviewRequestId;
        console.log(this.updateCandidateStatusInput);
        this.oneWayInterviewService.updateCandidateStatus(this.updateCandidateStatusInput)
          .subscribe((res: any) => {
              this.router.navigate(['candidate/oneway-interview-completed']);
          });
          this.blocked = false;

    }
      this.addReTakeValue();
      this.nextQuestionTickTime();

      this.blocked = false;
    });
  }

  nextQuestionTickTime(){
    this.cameraPreview();
    this.intThinkTimeTotal = moment.duration(this.oneWayInterviewQuestion.thinkTimeAllowed).asSeconds();
    this.intTimeLimitTotal = moment.duration(this.oneWayInterviewQuestion.timeAllowed).asSeconds();

    this.reTakeCount = 0;
    this.tmrTickThinkTime = null;
    this.tmrTickTimeLimit = null;
    // this.intThinkTimeTotal = 2;
    this.intThinkTimeElapsed = 0;
    // this.intTimeLimitTotal = 2;
    this.intTimeLimitElapsed = 0;


    $("#divProgressThinkTime").removeClass("bg-warning").removeClass("bg-danger");
    $("#divProgressTimeLimit").removeClass("bg-warning").removeClass("bg-danger");

    //Think Time
    $("#divProgressThinkTime").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    $("#divProgressThinkTime").addClass("progress");

    //Time Limit
    $("#divProgressTimeLimit").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    $("#divProgressTimeLimit").addClass("progress");
    $("#divRecordingStopped").addClass("d-none");

    this.clearVideoRecordedData();
    this.tmrTickThinkTime = setInterval(() => {
      this.TickThinkTime();
    }, 1000);

  }

  startRecording(){

    //Think Time
    clearInterval(this.tmrTickThinkTime);
    // $("#divProgressThinkTime").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    // $("#divProgressThinkTime").addClass("progress");
    $("#divRecordingStart").addClass("d-none");


    this.reTakeQuestion();
  }

  reTakeQuestion(){
    this.intThinkTimeTotal = moment.duration(this.oneWayInterviewQuestion.thinkTimeAllowed).asSeconds();
    this.intTimeLimitTotal = moment.duration(this.oneWayInterviewQuestion.timeAllowed).asSeconds();

    this.reTakeList[this.reTakeCount] = "bx bxs-square";
    this.reTakeCount += 1;
    this.tmrTickThinkTime = null;
    this.tmrTickTimeLimit = null;
    // this.intThinkTimeTotal = 2;
    this.intThinkTimeElapsed = 0;
    // this.intTimeLimitTotal = 2;
    this.intTimeLimitElapsed = 0;

    $("#divProgressTimeLimit").attr("style", "width: " + 0 + "%");
    // $("#divProgressThinkTime").removeClass("bg-warning").removeClass("bg-danger");
    $("#divProgressTimeLimit").removeClass("bg-warning").removeClass("bg-danger");

    //Think Time
    // $("#divProgressThinkTime").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    // $("#divProgressThinkTime").addClass("progress");

    //Time Limit
    $("#divProgressTimeLimit").removeClass("progress-bar bg-primary").removeClass("progress-bar");
    $("#divProgressTimeLimit").addClass("progress")

    //Hide The Retake bar
    $("#divRecordingStopped").addClass("d-none");
    $("#divRecording").removeClass("d-none");

    // this.clearVideoRecordedData();
    // this.tmrTickThinkTime = setInterval(() => {
    //   this.TickThinkTime();
    // }, 1000);

    this.clearVideoRecordedData();
       this.tmrTickTimeLimit = setInterval(() => {
        this.startVideoRecording();
        this.TickTimeLimit();

      }, 1000);
  }



  startVideoRecording() {

    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.videoRecordingService.startRecording(this.videoConf)
      .then(stream => {
        // this.video.src = window.URL.createObjectURL(stream);
        this.video.srcObject = stream;
        this.video.play();
        this.video.muted = true;
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    }

  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      clearInterval(this.tmrTickTimeLimit);
      // $("#divProgressTimeLimit").removeClass("bg-warning").removeClass("bg-danger");
      // $("#divProgressTimeLimit").removeClass("progress-bar bg-primary").removeClass("progress-bar");
      $("#divRecording").addClass("d-none");
      // $("#divProgressTimeLimit").attr("style", "width: " + 0 + "%");


      if(this.reTakeAllowed != this.reTakeCount){
        $("#divRecordingStopped").removeClass("d-none");
      }

      this.nextButtonDisabled = true;
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
      this.video.muted = false;
    }
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
   TickThinkTime() {

    this.intThinkTimeElapsed += 1;

    var intRemaining = this.intThinkTimeTotal - this.intThinkTimeElapsed;
    var intPercentage = Math.floor((this.intThinkTimeElapsed / this.intThinkTimeTotal) * 100);
    // var strRemaining = "- 0:" + intRemaining.toString().padStart(2, '0');
    var strRemaining = this.transform(intRemaining);

    $("#divRecordingStart").removeClass("d-none");

    $("#spnThinkTimeRemaining").text(strRemaining);
    $("#divProgressThinkTime").attr("style", "width: " + intPercentage + "%");

    if (intPercentage >= 90) {
      $("#divProgressThinkTime").removeClass("bg-primary").removeClass("bg-warning").addClass("bg-danger");
    } else if (intPercentage >= 75) {
      $("#divProgressThinkTime").removeClass("bg-primary").removeClass("bg-danger").addClass("bg-warning");
    } else {
      $("#divProgressThinkTime").removeClass("bg-warning").removeClass("bg-danger").addClass("bg-primary");
    }




    if (intRemaining == 0) {
      $("#divRecording").removeClass("d-none");
      $("#divRecordingStart").addClass("d-none");
       clearInterval(this.tmrTickThinkTime);
       this.tmrTickTimeLimit = setInterval(() => {
        this.startVideoRecording();
        this.TickTimeLimit();
      }, 1000);


    }
  }

  TickTimeLimit() {

      this.intTimeLimitElapsed += 1;

      var intRemaining = this.intTimeLimitTotal - this.intTimeLimitElapsed;
      var intPercentage = Math.floor((this.intTimeLimitElapsed / this.intTimeLimitTotal) * 100);
      //var strRemaining = "- 0:" + intRemaining.toString().padStart(2, '0');
      var strRemaining = this.transform(intRemaining);
      $("#spnTimeLimitRemaining").text(strRemaining);
      $("#divProgressTimeLimit").attr("style", "width: " + intPercentage + "%");

      if (intPercentage >= 90) {
        $("#divProgressTimeLimit").removeClass("bg-primary").removeClass("bg-warning").addClass("bg-danger");
      } else if (intPercentage >= 75) {
        $("#divProgressTimeLimit").removeClass("bg-primary").removeClass("bg-danger").addClass("bg-warning");
      } else {
        $("#divProgressTimeLimit").removeClass("bg-warning").removeClass("bg-danger").addClass("bg-primary");
      }

      if (intRemaining == 0) {
        clearInterval(this.tmrTickTimeLimit);
        this.stopVideoRecording();
        $("#divRecording").addClass("d-none");

        if(this.reTakeAllowed > 0)
          $("#divRecordingStopped").removeClass("d-none");
      }
    }



}
