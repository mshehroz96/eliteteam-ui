import { data } from 'jquery';
import { CheckUserAvailablity, Duration } from './../../../../_models/event/event';
import { Component, OnInit , Input, EventEmitter, Output } from '@angular/core';
import { CalendarApi } from '@fullcalendar/core';
import * as moment from 'moment';
import { Event } from 'src/app/_models/event/event';
import { EventService } from 'src/app/_services/event/event.service';
import { CommonService } from 'src/app/_services/common/common.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientmeeting',
  templateUrl: './clientmeeting.component.html',
  styleUrls: ['./clientmeeting.component.css']
})

export class ClientmeetingComponent implements OnInit {
  @Input() item : any = {};
  @Input() eventDate : Date = new Date();

  @Output() hdieRighPanel = new EventEmitter<any>();

  public event: Event = new Event();
  public calData !: CalendarApi;
  public fromTime: any;
  date : any;
  blocked : boolean = false;
  public checkUserAvailablity: CheckUserAvailablity = new CheckUserAvailablity();
  constructor(private eventService: EventService,
  private commonService : CommonService) { }

  durations: Duration[] = [];
  selectedDuration: any = { 'id' : 15 , name :  '15 Minutes' };

  isUseravailable: boolean = false;
  isNoUseravailable: boolean = false;

  isClientavailable: boolean = false;
  isNotClientavailable: boolean = false;

  selectListWidth : string = '100%';
  fromDate: any;
  toDate: any;

  companies: any[] = [];
  selcetUser: any;

  ngOnInit(): void {
    this.getCompanyUsers();
    this.date =  new Date(this.eventDate);

    this.durations = [
      {name: '5 Minutes',  id: 5},
      {name: '10 Minutes', id: 10},
      {name: '15 Minutes', id: 15},
      {name: '20 Minutes', id: 20},
      {name: '25 Minutes', id: 25},
      {name: '30 Minutes', id: 30},
      {name: '35 Minutes', id: 35},
      {name: '40 Minutes', id: 40},
      {name: '45 Minutes', id: 45},
      {name: '50 Minutes', id: 50},
      {name: '55 Minutes', id: 55},
      {name: '1 Hour', id: 60}
  ];
  }

  hideRightPanel(){
    this.hdieRighPanel.next({});
  }

  getCompanyUsers() {
    this.commonService.getAllCompaniesUsers().subscribe((res: any) => {
      if (res?.success) {
        this.companies = res?.data;
        console.log(this.companies);
      }
    });
  }




  createEvent() {
    if(this.fromTime == undefined){
      Swal.fire({
        icon: 'error',
        title: 'Required',
        text: 'Plese select time',
      });
      return;
    }

    if(this.isNoUseravailable == true){

        Swal.fire({
          icon: 'error',
          title: 'Unavailable',
          text: 'Please change your time slot!',
        });
        return;

    }

    if(this.isNotClientavailable == true){

        Swal.fire({
          icon: 'error',
          title: 'Unavailable',
          text: 'Client is not available on this time slot!',
        });
        return;
    }

    this.blocked = true;
    // this.event.fromTime= moment(this.fromTime, "h:mm:ss").format("HH:mm:ss");

    this.fromDate = new Date(moment(this.date).toDate());
    this.toDate = new Date(moment(this.date).toDate());

    // this.event.fromTime= moment(this.fromTime, "h:mm").format("HH:mm:00");
    this.fromDate = new Date(moment.utc(this.date).format());
    this.toDate = new Date(moment.utc(this.date).format());
    // this.event.toTime = moment(this.fromTime, "h:mm:ss").add(this.selectedDuration.id,'minutes').format("HH:mm:00");

    // this.event.toTime = moment(this.fromTime, "h:mm:ss").add(this.selectedDuration.id,'minutes').format("HH:mm:ss");
    this.event.eventTypeId = this.item.eventTypeId;
    this.event.slotDuration = this.selectedDuration.id;
    this.event.requisitionId = 0;
    this.event.calendarUserId = 0;


    this.event.fromDateTimeOffSet = new Date(moment(this.fromDate).format('yyyy-MM-DD') + ' ' + moment(this.fromTime, "h:mm:ss").format("HH:mm:ss"));
    this.event.toDateTimeOffSet = new Date(moment(this.toDate).format('yyyy-MM-DD') + ' ' +  moment(this.fromTime, "h:mm:ss").add(this.selectedDuration.id,'minutes').format("HH:mm:ss"));

    this.event.fromDateTimeOffSet = new Date(moment.utc(this.event.fromDateTimeOffSet).format());
    this.event.toDateTimeOffSet = new Date(moment.utc(this.event.toDateTimeOffSet).format());

    this.event.eventParticipants.push({ userId: this.selcetUser.userId });

    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe((res) => {
      this.item.isRefresh = true;
      this.hdieRighPanel.next(this.item);
      this.blocked = false;
    });

  }

  checkAvailablity(){
    if(this.fromTime != undefined){
    this.isNoUseravailable = false;
    this.isUseravailable = false;
    this.checkUserAvailablity.time = moment(this.fromTime, "h:mm:ss").format("HH:mm:ss");
    this.checkUserAvailablity.date = new Date(moment(this.date).add(1 ,"days").toDate());
    this.checkUserAvailablity.toTime = moment(this.fromTime, "h:mm:ss").add(this.selectedDuration.id,'minutes').format("HH:mm:ss");
    this.eventService.checkUserAvailablity(this.checkUserAvailablity).subscribe((res) => {
      if(res?.success){

        if(res.data == true){
          this.isNoUseravailable = true;

        }
        else{
          this.isUseravailable = true;
        }

        if(this.selcetUser != undefined){
          this.checkClientAvailablity();
        }
      }
    });
    }
  }

  checkClientAvailablity(){
    if(this.fromTime != undefined){
    this.isNotClientavailable = false;
    this.isClientavailable = false;
    this.checkUserAvailablity.time = moment(this.fromTime, "h:mm:ss A").format("HH:mm:ss");
    this.checkUserAvailablity.date = new Date(moment(this.date).add(1 ,"days").toDate());
    this.checkUserAvailablity.userId = this.selcetUser.userId;
    this.eventService.checkClientAvailablity(this.checkUserAvailablity).subscribe((res) => {
      if(res?.success){

        if(res.data == true){
          this.isNotClientavailable = true;

        }
        else{
          this.isClientavailable = true;
        }
      }
    });
  }
}

}
