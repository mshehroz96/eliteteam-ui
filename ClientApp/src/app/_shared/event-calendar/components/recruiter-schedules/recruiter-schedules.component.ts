import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Duration, Event } from 'src/app/_models/event/event';
import { EventService } from 'src/app/_services/event/event.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { IRecruiterScheduleDay } from 'src/app/_models/recutiter/IRecruiterSchedule';

@Component({
  selector: 'app-recruiter-schedules',
  templateUrl: './recruiter-schedules.component.html',
  styleUrls: ['./recruiter-schedules.component.css']
})
export class RecruiterSchedulesComponent implements OnInit {
  @ViewChild('dateFilter') private dateFilter: any;
  @Input() item : any = {};
  @Input() eventStartDate : Date = new Date();
  @Input() eventEndDate : Date = new Date();
  @Output() hdieRighPanel = new EventEmitter<any>();


  @Output() hideRightPanelWithoutRefresh = new EventEmitter<any>();
  @Output() hidePanelWithoutRefresh = new EventEmitter<any>();

  public event: Event = new Event();

  public fromTime: any;
  public toTime: any;
  rangeDates : any[] = [];
  blocked : boolean = false;
  durations: Duration[] = [];
  selectedDuration: any = { 'id' : 30 , name :  '30 Minutes' };
  stepMinute: number = 30;
  weeklySchedules?:IRecruiterScheduleDay[] = [];
  fromDate: any;
  toDate: any;
  constructor(private eventService: EventService) { }

  ngOnInit() {

    this.rangeDates.push(new Date(this.eventStartDate));
    this.rangeDates.push(new Date(this.eventEndDate));

    this.durations = [
      {name: '30 Minutes',  id: 30},
      {name: '1 Hour', id: 60},
      // {name: '2 Hours', id: 120},
      ];
      this.loadDays();
  }
  loadDays(){
    this.weeklySchedules = [
      {
        dayNo:1,
        dayName:"Monday",
        required:true,
        dayTimingFrom:"",
        dayTimingTo:"",
        recruiterScheduleID: 0,
        selected: true,
      },
      {
        dayNo:2,
        dayName:"Tuesday",
        required:true,
        dayTimingFrom:"",
        dayTimingTo:"",
        recruiterScheduleID:0,
        selected: true,
      },
      {
        dayNo:3,
        dayName:"Wednesday",
        required:true,
        recruiterScheduleID:0,
        selected: true,
      },
      {
        dayNo:4,
        dayName:"Thrusday",
        required:true,
        recruiterScheduleID:0,
        selected: true,
      },
      {
        dayNo:5,
        dayName:"Friday",
        required:true,
        recruiterScheduleID:0,
        selected: true,
      },
      {
        dayNo:6,
          dayName:"Saturday",
          required:false,
          recruiterScheduleID:0,
          selected: false,
      },
      {
        dayNo:0,
        dayName:"Sunday",
        required:false,
        recruiterScheduleID:0,
        selected: false,
      }
    ];
  }
  getStepTime(){
    console.log(this.selectedDuration);
    this.stepMinute = this.selectedDuration.id;
  }

  setFromTime(){

    var mint = moment(new Date()).minute();

    if(mint < 30){
      this.fromTime = moment(this.roundToNearest15(new Date(),30)).format("hh:mm a");
    }
    else if(mint >= 30 && mint <= 60){
      this.fromTime = moment(this.roundToNearest15(new Date(),60)).format("hh:mm a");
    }
    else if(mint > 60 && mint <= 120){
      this.fromTime = moment(this.roundToNearest15(new Date(),120)).format("hh:mm a");
    }



  }

  setToTime(){

    var mint = moment(new Date()).minute();
    if(mint < 30){
      this.toTime = moment(this.roundToNearest15(new Date(),30)).format("hh:mm a");
    }
    else if(mint >= 30 && mint <= 60){
      this.toTime = moment(this.roundToNearest15(new Date(),60)).format("hh:mm a");
    }
    else if(mint > 60 && mint <= 120){
      this.toTime = moment(this.roundToNearest15(new Date(),120)).format("hh:mm a");
    }


  }

   roundToNearest15(date = new Date(),minutes: number) : any {
    const ms = 1000 * 60 * minutes;
    return new Date(Math.round(date.getTime() / ms) * ms);
  }

  hdieWithoutRefresh(){
    this.item.isRefresh = true;
    this.hideRightPanelWithoutRefresh.next(this.item);
  }



  hideRightPanel(){
    this.item.isRefresh = false;
    this.hdieRighPanel.next(this.item);

  }


  onSelect(){
    if (this.rangeDates[1]) { // If second date is selected
      this.dateFilter.hideOverlay()
    };
  }


  cancel(){
    this.hidePanelWithoutRefresh.next({});
  }

  setSchedules() {

    var exists = this.weeklySchedules?.filter((item) => item.selected == true)[0];
    if(!exists){
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'Please selecte atleast one working day!',
      });
      return;
    }

    if(this.toTime == undefined || this.fromTime == undefined){
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'Please select start and end time',
      });
      return;
    }


    if(moment(this.toTime, "h:mm").format("HH:mm") < moment(this.fromTime, "h:mm").format("HH:mm")){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'To time must be greater than from time',
      });
      return;
    }

    this.event.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if(new Date(moment(new Date()).format('yyyy-MM-DD') + ' ' + this.fromTime).toString() != "Invalid Date"){
      this.fromTime = new Date(moment(new Date()).format('yyyy-MM-DD') + ' ' + this.fromTime);
    }

    if(new Date(moment(new Date()).format('yyyy-MM-DD') + ' ' + this.toTime).toString() != "Invalid Date"){
      this.toTime = new Date(moment(new Date()).format('yyyy-MM-DD') + ' ' + this.toTime);
    }


    this.event.title= 'RecruiterSchedules';

    // this.event.fromTime= moment(this.fromTime, "h:mm").format("HH:mm:00");
    // this.event.toTime = moment(this.toTime, "h:mm").format("HH:mm:00");

    this.event.slotDuration = this.selectedDuration.id;
    this.event.eventTypeId = this.item.eventTypeId;


    this.fromDate = new Date(moment.utc(this.rangeDates[0]).format());
    this.toDate = new Date(moment.utc(this.rangeDates[1]).format());



    this.fromDate =  new Date(moment(this.fromDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.fromTime).local().format("h:mm A"));
    this.toDate = new Date(moment(this.toDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.toTime).local().format("h:mm A"));

    this.event.fromDateTimeOffSet = new Date(moment(this.fromDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.fromTime).local().format("h:mm A"));
    this.event.toDateTimeOffSet = new Date(moment(this.toDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.toTime).local().format("h:mm A"));



    this.event.fromDateTimeOffSet = new Date(moment.utc(this.event.fromDateTimeOffSet).format());
    this.event.toDateTimeOffSet = new Date(moment.utc(this.event.toDateTimeOffSet).format());
    this.event.selectedDays = this.weeklySchedules;

    console.log(this.event);

    this.blocked = true;
    this.eventService.createRecruiterScheduleEvent(this.event).subscribe((res) => {
      this.item.isRefresh = true;
      this.hdieRighPanel.next(this.item);
      this.blocked = false;
    });

  }
}
