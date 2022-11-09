import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanFilters } from 'src/app/_models/Plan/IPlanFilters';
import { RequisitionService, CommonService, AuthenticationService } from 'src/app/_services';
import { PlanService } from 'src/app/_services/plan/plan.service';
import Swal from 'sweetalert2';
import { AddUpdatePlanComponent } from './add-update-plan/add-update-plan.component';

@Component({
  selector: 'app-plan-settings',
  templateUrl: './plan-settings.component.html',
  styleUrls: ['./plan-settings.component.css']
})
export class PlanSettingsComponent implements OnInit {
  plans: any[] = [];
  ref!: DynamicDialogRef;
  totalRecords: number = 0;
  searchFilter: string = '';
  loading: boolean = false;
  constructor( private route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly service: PlanService,
    private readonly authenticationService: AuthenticationService,
    private dialogService: DialogService) { }

  ngOnInit() {
  }
  getAllPlans(params: PlanFilters) {
    this.loading = true;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.service.getAllPlans(params).subscribe((res) => {
      if (res?.success) {
        this.plans = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  
  openSaveUpdatePlanModal(){
    this.ref = this.dialogService.open(AddUpdatePlanComponent, {
      header: 'Add Plan',
      data:{
        obj:null,
        action:"Add"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getAllPlans({});
      }
    })
  }
  editPlan(plan:any){
    this.ref = this.dialogService.open(AddUpdatePlanComponent, {
      header: 'Add Plan',
      data:{
        obj:plan,
        action:"Edit"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getAllPlans({});
      }
    })
  }
  deletePlan(item:any){

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this item?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        
        this.service.deletePlan(item).subscribe((res) => {
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
    })
  }
}
