import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FILES_PATHS } from 'src/app';
import { IRecruiters } from 'src/app/_models/recutiter/IRecruiters';
import { RecruiterExperties } from 'src/app/_models/recutiter/recutiter-filter';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';
import { environment } from 'src/environments/environment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { AddExpertiesComponentComponent } from './add-experties-component/add-experties-component.component';
import { DatePipe } from '@angular/common';
import { CalendarApi, CalendarOptions, DateRangeInput, DateSelectArg, DatesSetArg, EventApi, EventChangeArg, EventClickArg, EventHoveringArg, EventInput } from '@fullcalendar/core';
import * as moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import tippy from "tippy.js";
import { ThisReceiver } from '@angular/compiler';
import { RecruiterInactiveJobsComponent } from './recruiter-inactive-jobs/recruiter-inactive-jobs.component';
import { CustomDatePipe } from 'src/app/core/pipe';
@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {
  @ViewChild('fullCalendar') 
  calendarComponent: FullCalendarComponent | undefined; 
  
  @ViewChild('.fc-event-start', {static: false}) calendarEvent: ElementRef | undefined
  toolTipDiv: ElementRef | undefined


  events: any[] = [];
  options: any;
  header: any;
  basicData: any;
  basicOptions: any;
  calenderEvents:any[] = [];
  initialDate:Date = new Date();
  constructor(
      private route: ActivatedRoute,
      private readonly recruiterService: RecruiterService,
      private modalService: NgbModal,
      private fb: FormBuilder,
      private dialogService: DialogService,
      private datePipe: DatePipe,
      private readonly renderer: Renderer2,
      private customDatePipe:CustomDatePipe
      ) {
       
       }
  id:number = 0;
  loading: boolean = false;
  recruiterProfileDetail?:IRecruiters;
  strImage:string = "";
  closeResult: string = '';
  expertiesAutoComplete: any[] = [];
  expeertiesForm = this.fb.group({
		experties: [""],
	});
  experties: RecruiterExperties = {};
  recruiterExperties:RecruiterExperties[] = [];
  activities:any[] = [];
  summaries:any[] = [];
  ref!: DynamicDialogRef;
  fullCalendarDates:any;
  calendarOptions: CalendarOptions = {
		scrollTime: '00:00',
    height: 500,
    headerToolbar: {
        center: 'title',
        left: 'timeGridDay,timeGridWeek,timeGridMonth',
        right: 'prev,next'
      },
    // headerToolbar: {
    //   center: 'title',
    //   left: 'prev,next',
    //   right: 'timeGridDay,timeGridWeek,timeGridMonth'
    // },
    buttonText: {
      month:    'month',
      week:     'week',
      day:      'day'
    },
    views: {
      timeGridMonth: {
        buttonText:'month',
        type: 'timeGrid',
        duration: { days: 30},
        // visibleRange:(currentDate: any) => {
        //   debugger;
        //   var date = new Date();
        //   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        //   var lastDay = new Date(date.getFullYear(), date.getMonth(), -1);
        //   return { start: firstDay, end: lastDay };
        // },
      }
    },
    allDaySlot: false,
    slotDuration:"01:00:00",
    initialView: 'timeGridDay',
    weekends: true,
    editable: false,
    selectable: false,
    selectMirror: false,
    displayEventTime:false,
    slotMinTime:"06:00:00",
    slotMaxTime:"21:00:00",
    
    //   initialDate: new Date(),
    //   slotLabelFormat: [{
    //     weekday: 'short',
    //     day: 'numeric',
    //     month: 'numeric'
    //   },
    //   {
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     hour12: false
    //   }
    // ],
    // businessHours: {
    //   // days of week. an array of zero-based day of week integers (0=Sunday)
    //   // daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
    //   startTime: '10:00', // a start time (10am in this example)
    //   endTime: '18:00', // an end time (6pm in this example)
    // },
    // customButtons: {
    //     next: {
    //         click: this.nextClick.bind(this),
    //     },
    //     prev: {
    //         click: this.prevClick.bind(this),
    //     },
    // },
    dayHeaderContent: (arg:any) => {
      return moment(arg.date).format('MMM DD ddd');
    },
    eventContent:this.renderEventContent,
    select: this.handleDateSelect.bind(this),
    eventClick: this.showMyAvailablity.bind(this),
    datesSet:(event:any) => {
      // if(event.view.type == "timeGridMonth"){
      //   var date = new Date();
      //   this.calendarOptions.initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
      // }
      //this.calendarComponent?.options?.initialDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      
      // const api = this.calendarComponent?.getApi();
      // api?.setOption("initialDate",new Date(new Date().getFullYear(), new Date().getMonth(), 1))
      // api?.render();
      // setTimeout(()=>{ 
       
      // },500);
      this.getUserSchedules(event);
    },
    eventMouseEnter: (eventInfo: EventHoveringArg) => {
      if(eventInfo.event.extendedProps.activityCount > 0){
        tippy(eventInfo.el, {
          content: '<div style="background: rgba(97, 97, 97, 0.9) !important;color: #ffffff  !important;padding: 0.5rem !important;border-radius: 4px !important;border-right-color: rgba(97, 97, 97, 0.9) !important;"><div style="border-left-color: rgba(97, 97, 97, 0.9) !important;"><div style="">' + eventInfo.event.title + ' (' +eventInfo.event.extendedProps.activityCount + ')' + '</div></div></div>',
          allowHTML: true,
          arrow: true,
          duration:0,
          animation: 'fade',
        });
      }
    },
    eventMouseLeave: (eventInfo: EventHoveringArg) => {
      
    },
    eventChange: (eventInfo: EventChangeArg) => {
      
    },
    dateClick: this.handleDateClick.bind(this)
  };
  
  ngOnInit(): void {
    this.id =
    this.route.snapshot.paramMap.get('id') == null
      ? 0
      : Number(this.route.snapshot.paramMap.get('id'));
    this.getRecruiterProfileDetails(0,'');
    this.getRecruiterExperties();
    this.getUserActivities();
    this.getUserActivitySummary();
    this.getUserSchedules({});
    var aa = this.customDatePipe.transform('12-12-2202')
  }
  
  handleDateClick(event:any){
  }
  handleVisibleRange(){

  }
  handEventChange(){
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }
  // getInitialDateMonthView(){
  //   var date = new Date();
  //   var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //   return firstDay;
  // }
  // nextClick(event:any): void {
    
  // }
  // prevClick(event:any): void {

  // }
  // setDate(event:any){
  //     this.fullCalendarDates = event;
      
  //     this.sample();
  //     //this.getUserSchedules();
  // }
  getDate(date:any){
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];//todo asptext
    let html = '';
    html += '<span class="column-header-week">ttt</span>';
    html += '<span class="column-header-day">fff</span>';
    return html;
  }
  getUserSchedules(event:any) {
    let obj : any ={
      id:this.id,
      start: new Date(),
      end: new Date()
    }
    if(event.start && event.end){
      obj.start = new Date(moment(event.start).format('yyyy-MM-DD') + ' ' + moment.utc(event.start).local().format("h:mm A"));
      obj.end = new Date(moment(event.end).format('yyyy-MM-DD') + ' ' + moment.utc(event.end).local().format("h:mm A"));
    }
    this.recruiterService.getUserSchedules(obj).subscribe((res: any) => {
      if (res?.success) {
        this.calendarOptions.events = res?.data;
        const _obj = (
          res.data
            .map((row: { id: any; title: any; start: string;end: string; allDay: any; color: any;backgroundColor:any;activityCount:any;isScheduled:any;}) => {
              return {
                id: row.id,
                title: row.title,
                start : this.getTimeZoneDateTime(row.start),
                end:  this.getTimeZoneDateTime(row.end),
                // start: moment(row.start).format('YYYY-MM-DD HH:mm:ss'),
                // end: moment(row.end).format('YYYY-MM-DD HH:mm:ss'),
                color:  "#7ABD57",
                backgroundColor: row.isScheduled ?  '#F0FFDE' : 'white',
                textColor: "white",
                activityCount:row.activityCount,
                isScheduled:row.isScheduled
              }
            })
        )
        this.calendarOptions.events = _obj
      }
    });
  }
  getTimeZoneDateTime(value:string){
        const timezone = moment.tz.guess();
        const sourceFormat = 'MM/DD/YYYY HH:mm';
        const format = 'YYYY-MM-DD HH:mm:ss';
        value = moment(value).format(sourceFormat);
        return moment.tz(value, timezone).format(format);
  }
  renderEventContent(eventInfo:any, createElement:any) {
    var innerHtml;
    if (eventInfo.event._def.title) {
      // if(eventInfo.event._def.extendedProps.activityCount == 0){
      //   innerHtml = "<div class='progress'><div class='progress-bar bg-info' role='progressbar' style='width:0%' data-bs-toggle='tooltip'></div></div>";
      // }
      if(eventInfo.event._def.extendedProps.activityCount > 0){
        if(eventInfo.event._def.extendedProps.activityCount > 0 && eventInfo.event._def.extendedProps.activityCount <= 30){
          innerHtml = "<div class='progress'><div class='progress-bar bg-danger' role='progressbar' style='width: " + eventInfo.event._def.extendedProps.activityCount + "%' data-bs-toggle='tooltip' data-bs-original-title='Low Activity'></div></div>";
        }
        if(eventInfo.event._def.extendedProps.activityCount >= 30 && eventInfo.event._def.extendedProps.activityCount <= 70){
          innerHtml = "<div class='progress'><div class='progress-bar bg-warning' role='progressbar' style='width: " + eventInfo.event._def.extendedProps.activityCount + "%' data-bs-toggle='tooltip' data-bs-original-title='Low Activity'></div></div>";
        }
        if(eventInfo.event._def.extendedProps.activityCount >=  70 && eventInfo.event._def.extendedProps.activityCount <= 100){
          innerHtml = "<div class='progress'><div class='progress-bar bg-success' role='progressbar' style='width: " + eventInfo.event._def.extendedProps.activityCount + "%' data-bs-toggle='tooltip' data-bs-original-title='Medium Activity'></div></div>";
        }
        if(eventInfo.event._def.extendedProps.percentage > 100){
          innerHtml = "<div class='progress'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' data-bs-toggle='tooltip' data-bs-original-title='Low Activity'></div></div>";
        }
        return createElement = { html: '<div>'+innerHtml+'</div>' }
      }
    }
    return "";
  }
  handleDateSelect(EventData : DateSelectArg){
    
  }
  showMyAvailablity(EventData : EventClickArg){
  }
  getRecruiterProfileDetails(days:number,filter:string) {
    const date = new Date();
    var setDays = date.getDate() + days;
    date.setDate(setDays);
    var endDate = this.datePipe.transform(date, "yyyy-MM-dd") + "";

    const dateNow = new Date();
    var startDate = this.datePipe.transform(dateNow, "yyyy-MM-dd") + "";
    this.recruiterService.getRecruiterProfileDetails(this.id,startDate,endDate,filter).subscribe((res) => {
      this.recruiterProfileDetail = res?.data;
      this.strImage = FILES_PATHS.MAP_USER_AVATARS(this.recruiterProfileDetail?.avatarFileName??"");
      
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  searchExperties(event: any) {
    this.recruiterService.searchExperties(event.query).subscribe((res: any) => {
      if (res?.success) {
        this.expertiesAutoComplete = res?.data;
      }
    });
  }
  saveUpdateExperties(){
    let experties : RecruiterExperties = {
      recruiterUserID:this.id,
      areaOfExpertiseLIID:this.expeertiesForm.value.experties.listID,

    }
    if(!this.expeertiesForm.value.experties.listID){
      return;
    }
    this.recruiterService.addExperties(experties).subscribe((res) => {
      if (res?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Experties Saved Successfully!',
        });
        this.getRecruiterExperties();
      }
    });
  }
  getUserActivitySummary() {
    this.recruiterService.getUserActivitySummary(this.id).subscribe((res: any) => {
      if (res?.success) {
        this.summaries = res?.data;
      }
    });
  }
  getRecruiterExperties() {
    this.recruiterService.getExperties(this.id).subscribe((res: any) => {
      if (res?.success) {
        this.recruiterExperties = res?.data;
      }
    });
  }
  deleteExperties(item?:RecruiterExperties) {
    Swal.fire({
			title: "Delete",
			text: "Are you sure you want to delete this record?",
			showCancelButton: true,
		}).then((e) => {
			if (!e.dismiss) {
        this.recruiterService.deleteExperties(item?.recruiterSpecializationID).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Deleted Successfully!',
            });
            this.getRecruiterExperties();
          }
        });
			}
		});
  }
  getUserActivities() {
    this.recruiterService.getUserActivities(this.id).subscribe((res: any) => {
      if (res?.success) {
        this.activities = res?.data;
        this.activities = this.activities.filter(n => n.activity)
        this.activities = this.activities.slice(0, 10);
      }
    });
  }
  open() {
    let experties : RecruiterExperties = {
      recruiterUserID:this.id,
    }
    this.ref = this.dialogService.open(AddExpertiesComponentComponent, {
      header: 'Add Experties',
      data: {
        obj: experties,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.getRecruiterExperties();
    });
  }
  editExperties(obj:RecruiterExperties) {
    obj.recruiterUserID = this.id;
    this.ref = this.dialogService.open(AddExpertiesComponentComponent, {
      header: 'Edit Experties',
      data: {
        obj: obj,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((template: any) => {
      this.getRecruiterExperties();
    });
  }

  handleWeekendsToggle() {
    const { options } = this;
    options.weekends = !options.weekends;
  }
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
   
    
  }
  // getUserSchedules() {
  //   this.recruiterService.getUserSchedules(this.id).subscribe((res: any) => {
  //     if (res?.success) {
  //       this.calendarOptions.events = res?.data;
  //       const _obj = (
  //         res.data
  //           .map((row: { id: any; title: any; start: moment.MomentInput;end: moment.MomentInput; allDay: any; color: any;backgroundColor:any;}) => {
  //             return {
  //               id: row.id,
  //               title: "" ,
  //               start: moment(row.start).format('YYYY-MM-DD HH:mm:ss'),
  //               end: moment(row.end).format('YYYY-MM-DD HH:mm:ss'),
  //               color: row.color,
  //               backgroundColor: row.backgroundColor,
  //               textColor: "white"
  //             }
  //           })
  //       )
  //       this.calendarOptions.events = _obj
  //     }
  //   });
  //   // const array = [
  //   // 	{
  //   //     "id": '12',
  //   //     "title": "Click for Google",
  //   //     "start": "2022-09-25T14:30:00",
  //   //     "allDay": false
  //   //   }
  //   // ];
  //   // this.calendarOptions.events = array;
    
  // }

  
}
