import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { OneWayInterviewQuestionList } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { ApplicantScheduleInterview } from 'src/app/_models/recruitment/requisition-candidate';
import { CommonService, OneWayInterviewService, RecruitmentService } from 'src/app/_services';
import { Calendar, CalendarOptions, DurationInput, EventClickArg } from '@fullcalendar/core';
import { EventService } from 'src/app/_services/event/event.service';
import { SearchEventInput } from 'src/app/_models/event/event';
import * as moment from 'moment';
import { Methods } from 'src/app/_helper/method';
@Component({
  selector: 'app-interview-invite',
  templateUrl: './interview-invite.component.html',
  styleUrls: ['./interview-invite.component.css']
})
export class InterviewInviteComponent implements OnInit {

  invite: ApplicantScheduleInterview;
  options:any[]=[];
  applicantId:number=0;
  campaignType:string='';
  requisitionId:string='';
  oneWayInterviewTemplateId:number=0;
  questions: OneWayInterviewQuestionList[] = [];
  template!:OneWayInterviewTemplate;
  allEvents: any[] = [];
  minDate!: Date;
  maxDate!: Date;
  showAvailabilityNotDefined:boolean=false;
  searchEventInput : SearchEventInput = new SearchEventInput();
  constructor(
    public loadingService:LoadingService,
    private eventService: EventService,
    private recruitmentService:RecruitmentService,
    private commonService:CommonService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private oneWayInterViewService: OneWayInterviewService)
    {
      this.invite = new ApplicantScheduleInterview();
      this.template=new OneWayInterviewTemplate();
  }

  ngOnInit() {

    this.invite.requisitionCandidateId = Number(this.config.data.id);
    this.requisitionId=this.config.data.requisitionId;
    this.campaignType = this.config.data.campaignType;
    this.oneWayInterviewTemplateId = this.config.data.oneWayInterviewTemplateId;

    this.getRelativeDays();

    if(this.campaignType=='Video')
    {

      this.getOWITemplate();
      this.getOWIQuestions();
    }

    this.minDate = this.getRoundedDate(5);
    

  }
  getEvents() {

    this.loadingService.doLoading(
      this.eventService.getAllUserEvents(this.searchEventInput),this
    ).subscribe((res)=>
    {
      if (res?.success) {

        this.allEvents=res.data;
        this.showAvailabilityNotDefined = (this.allEvents.length == 0);
        this.calendarOptions.events = []
        const _obj = (
          res.data
          .map((row: { eventId: any; title: any; fromDateTimeOffSet: moment.MomentInput; status: any; fromTime:any ,eventType : any,
            duration: any, eventParticipant : any, toDateTimeOffSet: any,toDate: moment.MomentInput; }) => {
            return {
              id: row.eventId,
              title: row.eventType.code == "Availablity" ? moment(row.fromDateTimeOffSet).format('hh:mm A')
              + " - " + moment(row.toDateTimeOffSet).format('hh:mm A') :  row.title,
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
    });

    // this.eventService.getAllUserEvents(this.searchEventInput).subscribe((res) => {

    // });
  }

  getRoundedDate(minutes:number,d=(new Date()))
  {

  let ms = 1000 * 60 * minutes;

  let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

  return roundedDate
}

  isZoomMeetingChange()
  {
    if(this.invite.isZoomMeeting)
    {
      let expiryDateTime=(new Date());
      expiryDateTime.setHours(22,0,0);
      this.invite.expiryDateTime=Methods.customDateFormat(expiryDateTime,'MM/dd/yyyy hh:mm a');
      this.invite.zoomScheduleType = 'Calendar';
    }
    else
    {
      this.invite.expiryDateTime=undefined;
    }

  }
  zoomScheduleTypeChange()
  {
    if (this.invite.zoomScheduleType =='Calendar')
      {
        this.invite.requesterSlot1 = undefined;
        this.invite.requesterSlot2 = undefined;
        this.invite.requesterSlot3 = undefined;
      }
  }
  getOWITemplate() {
    if (this.oneWayInterviewTemplateId > 0) {
      this.oneWayInterViewService.getInterviewTemplate(this.oneWayInterviewTemplateId)
        .subscribe((res) => {
          this.template = res.data;
        });
    }
  }
  getOWIQuestions(){
    if (this.requisitionId.length > 0) {
      this.oneWayInterViewService.getOneWayInterviewQuestionsByRequisitionId(this.requisitionId)
        .subscribe((res) => {
          if (res.success) {

            this.questions = res.data;

            if(this.questions.length>0){
              this.oneWayInterViewService.getInterviewTemplate(this.oneWayInterviewTemplateId)
                .subscribe((res) => {
                  this.template = res.data;
              });
            }
          }
        });
    }
  }

  owiChangeType()
  {
    if (this.invite.oWDeadlineType =='Absolute')
    {
      let absoluteTime=(new Date());

      absoluteTime.setDate(absoluteTime.getDate()+7);
      absoluteTime.setHours(22,0,0);

      this.invite.oWDeadlineAbsoluteDateTime = Methods.customDateFormat(absoluteTime,"MM/dd/yyyy hh:mm a");
      this.invite.oWDeadlineRelativeDateTime=undefined;
      this.invite.oWDeadlineRelativeDateTimeDaysLiid=undefined;

    }
    else{
      this.invite.oWDeadlineAbsoluteDateTime=undefined;
    }

  }
  getRelativeDays()
  {
    this.commonService.getListItems(LIST_TYPES.ONEWAYINTERVIEW_DEADLINE_RELATIVE_DAYS).subscribe((res)=>
    {
      if(res.success)
        this.options=res.data;
    })
  }
  closeModel() {
    if (this.ref) {
      this.ref.close();
    }
  }

  inviteApplicant()
  {

    if(this.invite.isZoomMeeting)
    {
        this.invite.schedulingOption='Zoom';
    }

    this.loadingService.doLoading(
      this.recruitmentService.inviteApplicantForInterview(this.invite),this
    ).subscribe((res)=>
    {
        if(res.success)
        {
            this.ref.close({});
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
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    displayEventTime: false,
    datesSet: ((event)=> {
      this.searchEventInput.StartDate =  new Date(moment(event.view.currentStart).add(1 ,"days").toDate());
      this.searchEventInput.EndDate = new Date(event.view.currentEnd);
      this.getEvents();
    }),
  };
}
