import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRecruiterSchedule } from 'src/app/_models/recutiter/IRecruiterSchedule';
import { AuthenticationService, RecruiterService } from 'src/app/_services';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-add-update-recruiter-schedules',
  templateUrl: './add-update-recruiter-schedules.component.html',
  styleUrls: ['./add-update-recruiter-schedules.component.css']
})
export class AddUpdateRecruiterSchedulesComponent implements OnInit {
  schedule:IRecruiterSchedule;
  constructor(
    public config: DynamicDialogConfig,
    public service: RecruiterService,
    private ref: DynamicDialogRef,
    public authService: AuthenticationService) {
    this.schedule = {};
   }

  ngOnInit() {
    if(this.config.data.obj){
      this.schedule = this.config.data.obj;
      this.schedule.scheduleFromDate = moment(this.schedule.scheduleFromDate).format('MM/DD/YYYY')
      this.schedule.scheduleToDate = moment(this.schedule.scheduleToDate).format('MM/DD/YYYY');
      
    } 
  }
  saveUpdateSchedule(){
    this.schedule.recruiterUserID = this.authService.currentUserValue.userId;
    this.service.saveUpdateSchedule(this.schedule).subscribe((res: any) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: res.message,
          icon: 'success',
        }).then((result) => {
          this.ref.close(this.schedule);
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        }).then((result) => {
          this.ref.close(this.schedule);
        });
      }
    });
  }
  closeModal(): void {
    this.ref.close(this.schedule);
  }


}
