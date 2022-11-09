import dayGridPlugin from '@fullcalendar/daygrid'; //< import. it
import { FullCalendarModule, CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar, CalendarApi } from '@fullcalendar/angular';
import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { UserService } from 'src/app/_services/user/user.service';
import { Event } from 'src/app/_models/event/event';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DateClickArg } from '@fullcalendar/interaction';
import { ThisReceiver } from '@angular/compiler';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})




export class CalendarComponent implements OnInit {
  toppings = new FormControl('');
  toppingList: string[] = ['Registered Nurse', 'Network Engineer', 'Interpreter/Translator'];

  public eventId: string = ''
  public eventTitle: string = ''
  public eventStartDate: string = ''
  public eventEndDate: string = ''
  public eventSelectedDate: string = ''
  public occurance: string = 'Single'
  public getTitle: string = ''
  public fromDate: string = ''
  public toDate: string = ''
  public fromTime: string = '01:00:00'
  public toTime: string = '02:00:00'
  public fromDateTime: string = ''
  public EventData: Event = new Event();
  public calData !: CalendarApi;
  public getFullEvent !: EventClickArg;


  constructor(private userService: UserService)
  {
    this.getEvent();
  }

  ngOnInit(): void
  {
  }

  setAvailability() {
    // if (this.calData != null) {
    //   var start = new Date(this.EventData.fromDate);
    //   var end = new Date(moment(this.EventData.toDate).subtract(1 ,"days").toDate());
    //   var loop = new Date(start);
    //   while(loop <= end){
    //     console.log(loop)
    //     this.calData.addEvent({
    //       id: Math.random().toString(),
    //       title: 'Available',
    //       start:  loop,
    //       end:   loop ,
    //       allDay: true,
    //       color: '#e8fadf ',
    //       backgroundColor: '#e8fadf ',
    //       textColor: '#71dd37',
    //       display:'block'
    //     })
    //     var newDate = loop.setDate(loop.getDate() + 1);
    //     loop = new Date(newDate);
    //   }
    //   this.EventData.toDate = end
    // }
    // this.createEvent(this.EventData);
  }

  onScheduleMeeting() {
    // if (this.calData != null)
    // {
    //   this.calData.addEvent({
    //     id: Math.random().toString(),
    //     title: this.getTitle ? this.getTitle : 'Meeting',
    //     start: this.EventData.fromDate,
    //     allDay: true,
    //     color: '#d7f5fc',
    //     backgroundColor: '#d7f5fc',
    //     textColor: '#03c3ec',
    //     display:'block',
    //   })
    // }
    // this.EventData.title = this.getTitle ? this.getTitle : 'Meeting'
    // this.EventData.fromTime = moment(this.fromDateTime).format('HH:mm:ss')
    // this.createEvent(this.EventData);
  }

  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;
  div4: boolean = false;

  Close1() {
    this.div1 = false
    this.div2 = false
    this.div3 = false
    this.div4 = false
  }

  div1Function() {
    if (this.div1 == false) {
      this.div1 = true;
    }
    else {
      this.div1 = false;
    }
  }
  div2Function() {
    if (this.div2 == false) {
      this.div2 = true;
    }
    else {
      this.div2 = false;
    }
  }

  getEvent() {
    // this.userService.getAllUserEvents(1).subscribe((res) => {

    //   if (res?.success) {
    //     this.calendarOptions.events = []
    //     let event = res.data
    //     const _obj = (
    //       res.data
    //         .map((row: { eventId: any; title: any; fromDate: moment.MomentInput; status: any; fromTime:any }) => {
    //           return {
    //             id: row.eventId,
    //             title: row.title,
    //             start: moment(row.fromDate).format('YYYY-MM-DD'),
    //             // start: moment(row.fromDate +' '+ row.fromTime).format('YYYY-MM-DD HH:mm:ss'),
    //             color: row.title === 'Available' ?  '#e8fadf' : '#d7f5fc',
    //             backgroundColor:  row.title === 'Available' ?  '#e8fadf' : '#d7f5fc',
    //             textColor:  row.title === 'Available' ?  '#71dd37' : '#03c3ec',
    //              }
    //         })
    //     )
    //     this.calendarOptions.events = _obj
    //   }
    //   else {
    //     this.calendarOptions.events = []
    //   }
    // });
  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    buttonText: {
      dayGridMonth: 'Month',
      dayGridWeek: 'Week',
      dayGridDay: 'Day'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventTime:true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.eventClick.bind(this),
    // events: [{ title: 'event 1', date: '2022-08-03' , color: 'green' , //start:'2022-08-01', end:'2022-08-05'}],
  };

  eventClick(EventData : EventClickArg)
  {
    this.eventId = EventData.event.id
    this.eventTitle = EventData.event.title
    this.eventSelectedDate =  moment(EventData.event.startStr).format('DD/MM/YYYY')
    this.eventStartDate =  moment(EventData.event.startStr).format('DD/MM/YYYY')
    this.eventEndDate =  moment(EventData.event.startStr).format('DD/MM/YYYY')
    this.div1 = false;
    this.div2 = false;
    if(EventData.event.title == 'Available')
    {
      this.div4 = false;
      this.div3 = true;
    }
    else
    {
      this.div4 = true;
      this.div3 = false;
    }
    this.getFullEvent = EventData
  }

  onRemoveEvent()
  {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this schedule?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.getFullEvent.event.remove()

        console.log("hyyyyyyy")
        console.log(this.getFullEvent.event.id)
        this.userService.deleteEvent(parseInt(this.getFullEvent.event.id)).subscribe(() =>(this.getFullEvent.event.id));
        this.div3 = false
        this.div4 = false
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.div1 = false
    this.div2 = false
    this.div3 = false
    this.div4 = false

    const calendarApi = selectInfo.view.calendar;
    Swal.fire({
      showDenyButton: true,
      confirmButtonText: 'Set My Availibility',
      confirmButtonColor: '#B3DB6A',
      allowEscapeKey: true,
      denyButtonText: 'Schedual Client Meeting',
      denyButtonColor: '#0096FF'
    }).then((result) => {
      if (result.isConfirmed)
      {
        this.div1Function()
        this.fromDate = moment(selectInfo.start).format('YYYY-MM-DD')
        this.toDate = moment(selectInfo.end).subtract(1 ,"days").format('YYYY-MM-DD').toString()
        // var ev: Event = {
        //   eventId: 4,
        //   title: 'Available',
        //   fromDate: selectInfo.start,
        //   toDate: selectInfo.end,
        //   eventTypeId: 1,
        //   calendarUserId: 1,
        //   eventParticipants: [],
        //   requisitionCandidateID: 0,
        //   passCode: '',
        //   meetingNumber: '',
        // };
        // this.EventData = ev;
        // this.calData = calendarApi;
      }
      else if (result.isDenied)
      {
        this.div2Function()
        // var ev: Event = {
        //   eventId: 4,
        //   title: "",
        //   fromDate: selectInfo.start,
        //   toDate: selectInfo.start,
        //   eventTypeId: 1,
        //   calendarUserId: 1,
        //   eventParticipants: [],
        //   requisitionCandidateID: 0,
        //   passCode:'',
        //   meetingNumber: ''
        // };
        // this.EventData = ev;
        // this.calData = calendarApi;
        // this.fromDateTime = moment(selectInfo.start).format('YYYY-MM-DD HH:mm:ss')
      }
    })
  }
  createEvent(e: Event)
  {
    this.userService.createEvent(e).subscribe(() => (e));
  }
}
