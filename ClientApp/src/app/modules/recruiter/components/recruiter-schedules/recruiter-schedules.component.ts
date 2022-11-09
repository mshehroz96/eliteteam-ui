import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecruiterSchedule, IRecruiterScheduleDay } from 'src/app/_models/recutiter/IRecruiterSchedule';
import { AuthenticationService, RecruiterService } from 'src/app/_services';
import { AddUpdateRecruiterSchedulesComponent } from './add-update-recruiter-schedules/add-update-recruiter-schedules.component';
import { EditRecruiterScheduleComponent } from './edit-recruiter-schedule/edit-recruiter-schedule.component';
import { RecruiterScheduleDetailsComponent } from './recruiter-schedule-details/recruiter-schedule-details.component';

@Component({
  selector: 'app-recruiter-schedules',
  templateUrl: './recruiter-schedules.component.html',
  styleUrls: ['./recruiter-schedules.component.css']
})
export class RecruiterSchedulesComponent implements OnInit {
  schedules:IRecruiterSchedule[] = [];
  loading: boolean = false;
  showAdd:boolean = false;
  constructor(
    private dialogService: DialogService,
    private service:RecruiterService,
    private authService:AuthenticationService
    
  ) { }
  ref!: DynamicDialogRef;
  ngOnInit() {
    this.getSchedules();
    
  }

  openScheduleView(item:IRecruiterScheduleDay,recruiterScheduleID:number) {
    this.ref = this.dialogService.open(RecruiterScheduleDetailsComponent, {
      header: 'Schedule Details',
      data: {
        obj:item,
        recruiterScheduleID:recruiterScheduleID
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      height: '70%',
    });
    this.ref.onClose.subscribe((res) => {
      this.getSchedules();
    })

  }

  editSchedule(schedules:IRecruiterSchedule) {
    this.ref = this.dialogService.open(AddUpdateRecruiterSchedulesComponent, {
      header: 'Edit Schedule',
      data:{
        obj:schedules
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      height: '50%',
    });  
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getSchedules();
      }
    })  
  }
  getSchedules(){
    this.service.getRecruiterSchedules(this.authService.currentUserValue.userId).subscribe((res: any) => {
      if (res.success) {
        this.schedules = res.data;
        if(this.schedules.length == 0){
          this.showAdd = true;
        }
        else{
          this.showAdd = false;
        }
      }
    });
  }
  addUpdateSchedule(){
    this.dialogService.open(AddUpdateRecruiterSchedulesComponent, {
      header: 'Add Schedule',
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      height: '50%',
    });  
    this.ref.onClose.subscribe((template: any) => {
      this.getSchedules();
    });
  }
}
