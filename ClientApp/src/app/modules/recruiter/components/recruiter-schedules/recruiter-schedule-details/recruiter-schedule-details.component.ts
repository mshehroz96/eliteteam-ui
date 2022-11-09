import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecruiterScheduleDay } from 'src/app/_models/recutiter/IRecruiterSchedule';
import { RecruiterService } from 'src/app/_services';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recruiter-schedule-details',
  templateUrl: './recruiter-schedule-details.component.html',
  styleUrls: ['./recruiter-schedule-details.component.css']
})
export class RecruiterScheduleDetailsComponent implements OnInit {

  disableAll?:boolean = true;
  weeklySchedules?:IRecruiterScheduleDay[] = [];
  enableSubmit?:boolean;
  includeWeekdays?:boolean = false;
  constructor(
    private dialogService: DialogService,
    public config: DynamicDialogConfig,
    public service: RecruiterService,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit() {
    if(this.config.data.obj){
      this.weeklySchedules = this.config.data.obj;
      this.weeklySchedules?.map((item) => {
        item.dayTimingFrom = moment(item.dayTimingFrom, 'hh:mm a').format("hh:mm a");
        item.dayTimingTo = moment(item.dayTimingTo, 'hh:mm a').format("hh:mm a")
      })
      var found = this.weeklySchedules?.filter(item => item.dayNo == 6)[0];
      if(found){
        this.includeWeekdays = true;
      }
    } 
    else{
      this.weeklySchedules = [
        {
          dayNo:1,
          dayName:"Monday",
          required:true,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID,
          includeWeekdays:this.includeWeekdays
        },
        {
          dayNo:2,
          dayName:"Tuesday",
          required:true,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID,
          includeWeekdays:this.includeWeekdays
        },
        {
          dayNo:3,
          dayName:"Wednesday",
          required:true,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID,
          includeWeekdays:this.includeWeekdays
        },
        {
          dayNo:4,
          dayName:"Thrusday",
          required:true,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID,
          includeWeekdays:this.includeWeekdays
        },
        {
          dayNo:5,
          dayName:"Friday",
          required:true,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID,
          includeWeekdays:this.includeWeekdays
        }
      ];
    }
    
  }
  
  closeScheduleView(){
    this.ref.close();
    this.ref.destroy();
  }
  enableEditing(){
    this.disableAll = false;
  }
  copySchedules(from?:string,to?:string){
    if(from){
      this.weeklySchedules?.forEach((element) => {
        element.dayTimingFrom = from;
      })
    }
    if(to){
      this.weeklySchedules?.forEach((element) => {
        element.dayTimingTo = to;
      })
    }
  }
  showError : boolean = false;
  saveUpdateWeeklySchedules(){
    this.weeklySchedules?.map((elem) => {
      elem.dayTimingFrom = moment(elem.dayTimingFrom, "h:mm").format("HH:mm:00");
      elem.dayTimingTo =moment(elem.dayTimingTo, "h:mm").format("HH:mm:00");
    })
    this.service.saveUpdateDailySchedules(this.weeklySchedules).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: res.message,
          icon: 'success',
        }).then((result) => {
          this.ref.close(this.weeklySchedules);
        });
      }
      else{
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        }).then((result) => {
          this.ref.close(this.weeklySchedules);
        });
      }
    });
  }
  includeWeekDays(){
    this.includeWeekdays = !this.includeWeekdays;
    if(this.includeWeekdays){
      this.weeklySchedules?.push(
        {
          dayNo:6,
          dayName:"Saturday",
          required:false,
          dayTimingFrom:"",
          dayTimingTo:"",
          recruiterScheduleID:this.config.data.recruiterScheduleID
        })
        this.weeklySchedules?.push(
        {
            dayNo:7,
            dayName:"Sunday",
            required:false,
            dayTimingFrom:"",
            dayTimingTo:"",
            recruiterScheduleID:this.config.data.recruiterScheduleID
        })
    }
    else{
      this.weeklySchedules = this.weeklySchedules?.filter(item => item.dayNo != 6);
      this.weeklySchedules = this.weeklySchedules?.filter(item => item.dayNo != 7);
    }
    
  }

}
