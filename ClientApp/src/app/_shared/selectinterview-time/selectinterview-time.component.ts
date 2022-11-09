import { userAvailablityFilter, userSlotFilter } from './../../_models/client/candidatefilter';
import { Event } from './../../_models/event/event';
import { CandidateService } from './../../_services/candidate/candidate.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/_services/event/event.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-selectinterview-time',
  templateUrl: './selectinterview-time.component.html',
  styleUrls: ['./selectinterview-time.component.css']
})
export class SelectinterviewTimeComponent implements OnInit {
  @Input() user : any = {};
  @Output() hideCalendar = new EventEmitter<any>();
  selectedDate : Date =  new Date();
  rangeDates : any;
  scheduleOption : any;
  userId: number = 0;
  month: number = 0;
  year: number = 0;
  userAvailablityFilter : userAvailablityFilter = {};
  userSlotFilter : userSlotFilter = {};
  timsSlots : any [] = [];
  errorMessage : boolean = false;
  fromDate : Date = new Date();
  toDate:  Date = new Date();
  blocked: boolean = false;
  eventDate : Date = new Date();
  fromTime : any;
  endTime : any;
  fromDay : number = 0;
  toDay : number = 0;
  interviewRequestedSlots : any [] = [];
  minDate : Date = new Date();
  availabilities : any[] = [];
  public event: Event = new Event();
  constructor(
    private  candidateService : CandidateService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {

    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    if(this.user.schedulingType == 'Select from slots'){

      this.getInterviewRequestedSlots();
    }
    else{
      this.getUserAvailablity();

    }
  }

  getUserInterviewRequestedSlots(){

  }

  onMonthChange(event:any){
    this.timsSlots = [];
    this.month = event.month;
    this.year = event.year;
    this.getUserAvailablity();
  }

  getInterviewRequestedSlots(){
    this.blocked = true;
    this.userSlotFilter.inviterUserID = this.user.userId;
    this.userSlotFilter.requisitionInterviewRequestID = this.user.requisitionInterviewRequestID;
    this.candidateService.getCandidateInterviewSlots(this.userSlotFilter).subscribe((res) => {
      if(res?.success){
        this.interviewRequestedSlots = res.data;

       }
       this.blocked = false;
      });
  }


  getUserAvailablity(){
    this.blocked = true;
    this.userAvailablityFilter.userId = this.user.userId;
    this.userAvailablityFilter.month = this.month;
    this.userAvailablityFilter.year = this.year;
    this.fromDay = 0;
    this.toDay =0;
    this.candidateService.getUserAvailablity(this.userAvailablityFilter).subscribe((res) => {
      this.blocked = false;
      if(res?.success){
        if(res.data != null){
          // this.fromDate =  new Date(res.data.fromDate);
          // this.toDate =  new Date(res.data.toDate);

          this.fromDate = new Date(moment.utc(res.data.availibiltyDto.fromDateTimeOffSet).format());
          this.toDate = new Date(moment.utc(res.data.availibiltyDto.toDateTimeOffSet).format());

          this.availabilities =  res.data.userAvailibilty;

          console.log(this.availabilities);


          this.availabilities.forEach(element => {
            element.date = moment.utc(element.toDateTimeOffSet).local().format("YYYY/MM/DD");
          });

          console.log(this.availabilities);

          this.fromDay = parseInt(moment(new Date(this.fromDate)).format("DD"));
          this.toDay = parseInt(moment(new Date(this.toDate)).format("DD"));

          this.rangeDates = [this.fromDate, this.toDate ];
          this.getTimeSlots(new Date(moment.utc(new Date()).format()));

        }
      }
         this.blocked = false;
      });



  }

  addMonth(month:number):number{
    return month + 1;
  }

  getTimeSlots(value: any){


    $(".default").removeClass("selected-color");
    $(".redcolor").removeClass("selected-color");

    $("#" + moment(value).date() + "-" + this.month).addClass("selected-color");
    this.blocked = true;
    this.errorMessage = false;


    const dateObject = this.availabilities.find((obj) => {
      return obj.date == moment(value).format("YYYY/MM/DD");
    });

    if(dateObject == null){
      this.timsSlots = [];
      this.errorMessage = true;
      this.blocked = false;
    }
    this.userSlotFilter.checkDate =  dateObject.fromDateTimeOffSet;
    this.userSlotFilter.inviterUserID = this.user.userId;
    this.eventDate = new Date(moment(value).format("yyyy-MM-DD"));

    this.candidateService.getUserSlotByDate(this.userSlotFilter).subscribe((res) => {

      if(res?.success){
        this.timsSlots = res.data;
        if(this.timsSlots.length == 0){
          this.errorMessage = true;
        }
       }
       this.blocked = false;
      });

  }

  timeFormat(time:any) : any{
    return moment.utc(time, "h:mm:ss").local().format("h:mm: A");
  }

  close(){
    this.hideCalendar.next(null);
  }

  createEvent(){

    this.event.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // this.event.fromDate = new Date(moment(this.eventDate).format('yyyy-MM-DD'));
    // this.event.toDate = new Date(moment(this.eventDate).format('yyyy-MM-DD'));

    // this.event.toTime = moment.utc(this.endTime, "h:mm:ss").local().format("HH:mm:00");
    // this.event.fromTime= moment.utc(this.fromTime, "h:mm:ss").local().format("HH:mm:00");


    this.event.fromDateTimeOffSet = new Date(moment(new Date(moment(this.eventDate).format('yyyy-MM-DD'))).format('yyyy-MM-DD') + ' ' +  moment.utc(this.fromTime, "h:mm:ss").local().format("HH:mm:00"));
    this.event.toDateTimeOffSet = new Date(moment(new Date(moment(this.eventDate).format('yyyy-MM-DD'))).format('yyyy-MM-DD') + ' ' + moment.utc(this.endTime, "h:mm:ss").local().format("HH:mm:00"));

    this.event.fromDateTimeOffSet = new Date(moment.utc(this.event.fromDateTimeOffSet).format());
    this.event.toDateTimeOffSet = new Date(moment.utc(this.event.toDateTimeOffSet).format());

    console.log(this.event.fromDateTimeOffSet);
    console.log(this.event.toDateTimeOffSet);

    this.event.recruiterId = this.user.recruiterId;
    this.event.eventTypeId = 6;
    this.event.requisitionId = this.user.requisitionId;
    this.event.title = this.user.jobTitle;
    this.event.eventId = this.user.eventId;
    this.event.calendarUserId = this.user.userId;
    this.event.venue = this.user.type;
    this.event.requisitionCandidateID= this.user.requisitionCandidateID;
    this.event.requisitionInterviewRequestID = this.user.requisitionInterviewRequestID;
    this.event.eventParticipants.push({ userId: 0  });

    this.event.utcOffSet = moment.parseZone(new Date()).utcOffset();

    this.blocked = true;
    this.candidateService.createEvent(this.event).subscribe((res) => {
      this.hideCalendar.next(null);
      this.blocked = false;
      this.close();
      Swal.fire({
        icon: 'success',
        title: this.event.eventId == 0 ? 'Interview Scheduled' : 'Interview Rescheduled',
        text: this.event.eventId == 0 ? 'The Interview is succesfully scheduled on the selected date/time.' :
        'The interview has been rescheduled successfully.',
      });
    });

  }

  selectInterviewRequestSlotTime(item:any,event: any){
    this.eventDate = new Date(moment(item.date).toDate());
    this.fromTime = moment(new Date(item.date), "h:mm:ss").format("HH:mm:ss");
    this.endTime = moment(new Date(item.date), "h:mm:ss").format("HH:mm:ss");

    event.srcElement.classList.removeClass("list-group-item list-group-item-action text-center ng-star-inserted");
    setTimeout(()=>{
      event.srcElement.classList.add("list-group-item list-group-item-action text-center ng-star-inserted active");
    },0);

  }

  selectSlotTime(item:any,event: any){

    this.fromTime = item.startTime;
    this.endTime = item.endTime;
    event.srcElement.classList.removeClass("list-group-item list-group-item-action text-center ng-star-inserted");
    setTimeout(()=>{
      event.srcElement.classList.add("list-group-item list-group-item-action text-center ng-star-inserted active");
    },0);
  }
}
