import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as moment from 'moment';
import { PlanService } from 'src/app/_services/plan/plan.service';
import Swal from 'sweetalert2';
import { rstrtohex } from 'jsrsasign';

@Component({
  selector: 'app-add-update-plan',
  templateUrl: './add-update-plan.component.html',
  styleUrls: ['./add-update-plan.component.css']
})
export class AddUpdatePlanComponent implements OnInit {
  plan:any;
  action:string = "";
  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private service: PlanService
    ) { 
    this.plan = {};
  }

  ngOnInit() {
    if(this.config.data.obj){
      this.plan = this.config.data.obj;
      this.plan.startDate = moment(this.plan.startDate).format('MM/DD/YYYY')
      this.plan.endTime = moment(this.plan.endTime).format('MM/DD/YYYY');
    }
  }
  addUpdatePlan(){
    this.plan.startDate = new Date(this.plan.startDate);
    this.plan.endTime = new Date(this.plan.endTime);
    this.service.addUpdatePlan(this.plan).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: res.message,
          icon: 'success',
        }).then((result) => {
          this.ref.close({});
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        })
      }
    });
  }
  
  closeModal(): void {
    this.ref.close(this.plan);
  }
  
  

}
