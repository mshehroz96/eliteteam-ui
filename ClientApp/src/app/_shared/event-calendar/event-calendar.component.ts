import { DateSelectArg, FullCalendarModule, CalendarApi } from '@fullcalendar/angular';
import { EventService } from './../../_services/event/event.service';
import { Component, OnInit , Input  } from '@angular/core';
import { Calendar, CalendarOptions, DurationInput, EventClickArg } from '@fullcalendar/core';
import * as moment from 'moment';
import { AuthenticationService } from '../../../app/_services/authentication/authentication.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { SearchEventInput } from 'src/app/_models/event/event';
import Swal from 'sweetalert2';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {

  constructor(private eventService: EventService,
    private authenticationService : AuthenticationService,
    private commonService: CommonService) { }
  dialog : boolean = false;
  eventType : any;
  eventTypes: any[] = [];
  availablity : boolean = false;
  clientMeeting: boolean = false;
  blocked : boolean = false;
  myAvailablity : boolean = false;
  clientMeetingView : boolean = false;
  candidateInterview : boolean = false;
  eventData : any;
  allEvents : any[] = [];
  eventEndDate : any;
  eventStartDate : any;
  calData !: CalendarApi;
  schedules : boolean = false;
  mySchedules:boolean = false;
  requisitions: any[] = [];
  selectedRequisition: any[] = [];
  searchEventInput : SearchEventInput = new SearchEventInput();
  clientRequisitions: any[] = [];
  userType!:number;
  loadedScheduleEventType?:any;
  ngOnInit(): void {
    this.searchEventInput.withSchedules = false;
    this.getEventTypes();
    this.getRequisitions();
    this.userType = this.authenticationService.currentUserValue.userType;
  }

getRequisitions(){
  this.commonService.getRequisitionForCalendar().subscribe((res) => {
      if(res?.success){
        this.requisitions = res?.data;
      }
  });
}

  getEventTypes(){
    this.eventService.getEvenTypes().subscribe((res) => {
        if(res?.success){
          this.eventTypes = res?.data;
          this.loadedScheduleEventType = this.eventTypes.filter(item => item.eventTypeId === 7)[0];
          if(!this.searchEventInput.withSchedules){
            this.eventTypes =this.eventTypes.filter(item => item.eventTypeId !== 7);
          }
          // if(this.userType != 3){
          //   this.eventTypes.filter((item) => item.eventTypeId != 7);
          // }
        }
    });
  }

  calendarOptions: CalendarOptions = {

    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {

      dayGridMonth: 'Month',
      dayGridWeek: 'Week',
      dayGridDay: 'Day'
    },


    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventTime:false,
    select: this.handleDateSelect.bind(this),

    datesSet: ((event)=> {
      this.searchEventInput.StartDate =  new Date(moment(event.view.currentStart).add(1 ,"days").toDate());
      this.searchEventInput.EndDate = new Date(event.view.currentEnd);
      this.getEvents();
}),
    eventClick: this.showMyAvailablity.bind(this),
  };


  getEvents(){

    if(this.searchEventInput.withSchedules){
      var exists = this.eventTypes.filter(item => item.eventTypeId === 7)[0];
      if(!exists){
        this.eventTypes.push(this.loadedScheduleEventType);
      }
    }
    else{
      this.eventTypes =this.eventTypes.filter(item => item.eventTypeId !== 7);
    }
    this.blocked = true;
    this.clientRequisitions = [];
    this.selectedRequisition.forEach(element => {
      this.clientRequisitions.push({ 'requisitionId' : element });
    });
    this.searchEventInput.clientRequisitions = this.clientRequisitions;
    this.searchEventInput.userId = 0;
    this.eventService.getAllUserEvents(this.searchEventInput).subscribe((res) => {
      if (res?.success) {
        this.calendarOptions.events = []
        this.allEvents = res.data;
        const _obj = (
          res.data

            .map((row: { eventId: any; title: any; fromDateTimeOffSet: moment.MomentInput; status: any;eventType : any,
              duration: any, eventParticipant : any, toDateTimeOffSet: any,toDate: moment.MomentInput; }) => {
              return {
                id: row.eventId,
                title: row.eventType.code == "Availablity" ? moment(row.fromDateTimeOffSet).format('hh:mm A') + " - " + moment(row.toDateTimeOffSet).format('hh:mm A') :  (row.title == "RecruiterSchedules" ? "On-Duty" : row.title),
                start: moment(row.fromDateTimeOffSet).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(row.toDateTimeOffSet).format('YYYY-MM-DD HH:mm:ss'),
                color: row.eventType.foreColor,
                backgroundColor: row.eventType.backColor,
                textColor: row.eventType.foreColor
              }
            })
        )
        this.calendarOptions.events = _obj
      }
      else {
        this.calendarOptions.events = []
      }

      this.blocked = false;
    });
  }




  handleDateSelect(EventData : DateSelectArg){

    this.availablity = false;
    this.myAvailablity= false;
    this.schedules = false;
    this.mySchedules = false;
    this.clientMeetingView= false;
    this.eventStartDate =  EventData.start;
    this.eventEndDate = new Date(moment(EventData.end).subtract(1 ,"days").toDate());

    if(this.authenticationService.currentUserValue.userType != 3){

      setTimeout(() => {
        this.availablity= true;
        this.eventType= { 'eventTypeId': 1 };
        this.dialog = false;
        this.clientMeeting= false;
        this.myAvailablity= false;
        this.clientMeetingView= false;
      }, 0.0000001);
    }
    else{

      if(moment(new Date(this.eventStartDate)).format('MM/DD/YYYY') < moment(new Date()).format('MM/DD/YYYY')){
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: 'You can not create your availability in past date!',
        });
      }else{
        this.dialog = true;
      }
    }
  }

  showMyAvailablity(EventData : EventClickArg){
    this.eventData = {};
    this.clientMeetingView = false;
    this.clientMeeting= false;
    this.availablity= false;
    this.myAvailablity= false;
    this.candidateInterview = false;
    this.mySchedules = false;
    this.schedules = false;
    const event = this.allEvents.find((obj) => {
        return obj.eventId == EventData.event.id;
    });
    this.eventData.eventId = EventData.event.id;
    this.eventData.duration = event.duration;
    this.eventData.seriesId = event.seriesId;
    this.eventData.eventTypeId = event.eventTypeId;
    this.eventData.fromTimeToString = moment.utc(event.fromDateTimeOffSet).local().format("h:mm A");
    this.eventData.toTimeToString   =  moment.utc(event.toDateTimeOffSet).local().format("h:mm A");
    this.eventData.eventTitle = EventData.event.title;
    this.eventData.eventSelectedDate =  moment(EventData.event.startStr).format('DD/MM/YYYY');
    this.eventData.eventStartDate =  moment(EventData.event.startStr).format('DD/MM/YYYY');
    this.eventData.eventEndDate =  moment(EventData.event.startStr).format('DD/MM/YYYY');
    this.eventData.client = event.client;
    this.eventData.participants = event.participants;
    this.eventData.activeCandidates = event.activeCandidates;
    this.eventData.jobTitle = event.jobTitle;
    this.eventData.campaignType = event.campaignType;

    this.eventData.requisitionCandidateStatus = event.requisitionCandidateStatus;
    setTimeout(() => {
    if(event.eventType.code == 'Availablity'){
      this.mySchedules  = false;
      this.myAvailablity = true;
      this.clientMeetingView = false;
    }
    else if(event.eventType.code == "ClientMeeting"){
      this.mySchedules  = false;
      this.clientMeetingView = true;
      this.myAvailablity = false;
      this.candidateInterview = false;
    }
    else if(event.eventType.code == "CandidateInterview"){
      this.mySchedules = false;
      this.candidateInterview = true;
      this.clientMeetingView = false;
      this.myAvailablity = false;
    }
    else if(event.eventType.code == "CandidateInterview"){
      this.mySchedules  = false;
      this.candidateInterview = true;
      this.clientMeetingView = false;
      this.myAvailablity = false;
    }
    else if(event.eventType.code == "RecruiterSchedule"){
      this.mySchedules = true;
      this.candidateInterview = false;
      this.clientMeetingView = false;
      this.myAvailablity = false;
    }
  }, 0.0000001);

  }

  hdieRighPanel(item:any){

    this.clientMeeting = false;
    this.availablity= false;
    this.myAvailablity= false;
    this.clientMeetingView= false;
    this.schedules = false;
    this.getEvents();
  }

  hidePanelWithoutRefresh(item:any){
    this.schedules = false;
    this.clientMeeting = false;
    this.availablity= false;
    this.myAvailablity= false;
    this.clientMeetingView= false;
  }


  showRighPanel(item:any){
    if(item.code == "Availablity"){
      this.availablity= true;
      this.eventType= item;
      this.dialog = false;
      this.clientMeeting= false;
      this.myAvailablity= false;
      this.clientMeetingView= false;
      this.candidateInterview= false;
    }
    else if(item.code == "ClientMeeting"){
      this.clientMeeting= true;
      this.eventType= item;
      this.dialog = false;
      this.availablity= false;
      this.myAvailablity= false;
      this.clientMeetingView= false;
      this.candidateInterview= false;
    }
    else if(item.code == "CandidateInterview"){
      this.candidateInterview= true;
      this.clientMeeting= false;
      this.eventType= item;
      this.dialog = false;
      this.availablity= false;
      this.myAvailablity= false;
      this.clientMeetingView= false;
    }
    else if(item.code == "RecruiterSchedule"){
      this.schedules = true;
      this.candidateInterview= false;
      this.clientMeeting= false;
      this.eventType= item;
      this.dialog = false;
      this.availablity= false;
      this.myAvailablity= false;
      this.clientMeetingView= false;
    }
  }

}
