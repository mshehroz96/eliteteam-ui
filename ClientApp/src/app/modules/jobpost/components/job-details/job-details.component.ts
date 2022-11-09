import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionStatus } from 'src/app/_models/requisition/requisition-status';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import Swal from 'sweetalert2';
import { PostJobComponent } from './post-job/post-job.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  uuid: string = '';
  activeIndex: number = 0;
  companyId:number = 0;
  requisitionRequest: RequisitionRequest = new RequisitionRequest();
  
  ref!: DynamicDialogRef;
  showOWI:boolean=false;
  constructor(
    public loadingService:LoadingService,
    private route: ActivatedRoute,
    private router:Router,
    public requisitionRequestService: RequisitionRequestService,
    public dialogService: DialogService) {

    this.activeIndex = requisitionRequestService.activeStepIndex.value;
    this.uuid = this.route.snapshot.params['id'];
    if (this.uuid != '~' && this.uuid.length > 0) {
      
        this.loadingService.doLoading(
          this.requisitionRequestService.getRequisition(this.uuid),this
        ).subscribe((res) => {
        if (res?.success) {

          this.requisitionRequest = res.data;
          this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest);      

          if(this.requisitionRequest.campaignType=='Video')
          {
            this.showOWI=true;
            this.items.push(
              {
                label: 'One-way Interview',
                command: (event: any) => {
                  this.requisitionRequestService.activeStepIndex.next(4);
                }
              });
          }
        }
      })
    }
    else {
      this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
    }
  }

  items!: MenuItem[];

  subscription!: Subscription;

  ngOnInit() {

    this.items = [{
      label: 'Basic',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(0);
      }
    },
    {
      label: 'Details',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(1);
      }
    },
    {
      label: 'Compensation',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(2);
      }
    },
    {
      label: 'Screening',
      command: (event: any) => {
        this.requisitionRequestService.activeStepIndex.next(3);
      }
    }
    ];


    this.requisitionRequestService.activeStepIndex.subscribe((step: number) => {
      this.activeIndex = step;
    });
    this.fetchCompanyIdByJobUUID();
  }
  fetchCompanyIdByJobUUID(){
    this.requisitionRequestService.fetchCompanyIdByJobUUID(this.uuid).subscribe((res)=>
    {
      if(res.success)
      {
        this.companyId = res.data;
      }
    })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateJob() {
      this.loadingService.doLoading(
        this.requisitionRequestService.createOrUpdateRequisition(this.requisitionRequest), this
      )
      .subscribe((res: any) => {
        if (res?.success) {
          Swal.fire({
            title: 'Requisition Request',
            text: "Requisition information has been saved successfully",
            icon: 'success'
          }).then(() => 
          {
            this.cancel();
          });
          
        }
      });
  }
  cancel() {
    this.requisitionRequest.editJob=false;
  }

  editJob() {
    this.requisitionRequestService.requisitionRequest.editJob = true;
  }
  updateJpmStatus(status: string) {
    
    let requisitionStatus = new RequisitionStatus();
    requisitionStatus.status = status;
    requisitionStatus.requisitionId = this.requisitionRequestService.requisitionRequest.requisitionId;
    this.requisitionRequestService.requisitionRequest.jpmStatus.displayText = status;

    this.loadingService.doLoading(
      this.requisitionRequestService.updateRequisitionJpmStatus(requisitionStatus),this
    ).subscribe((res) => {
    
    });
  }

  cancelJob(){
    Swal.fire({
      title: 'Cancel Job',
      icon: 'warning',
      text: 'Are you sure you want to cancel this job?',
      showCancelButton:true,
      showConfirmButton:true,
      confirmButtonText:'Yes, Cancel it',
      cancelButtonText:'No'
    }).then((result) => {
      if(result.isConfirmed)
      {
        var requisitionStatus=new RequisitionStatus();
        requisitionStatus.requisitionId=this.requisitionRequest.requisitionId;
        requisitionStatus.status="Cancel";

        this.requisitionRequestService.updateRequisitionStatus(requisitionStatus).subscribe((res)=>
        {
          if(res.success)
          {
            Swal.fire({
              title: 'Cancel Job',
              icon: 'success',
              text: 'This job will now start appearing in "Inactive Jobs" page',
            }); 
          }
        })
      }
    }); 
  }
  postJob() {
    this.ref = this.dialogService.open(PostJobComponent, {
      header: 'Post Job',
      data: {
        id: this.requisitionRequestService.requisitionRequest.requisitionId,
        campaignType:this.requisitionRequestService.requisitionRequest.campaignType,
        oneWayInterviewTemplateId: this.requisitionRequestService.requisitionRequest.jobTitle.oneWayInterviewTemplateId,
        action: 'Post'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((job: any) => {
      if(job)
      {
        Swal.fire({
          title: 'Post Job',
          icon: 'success',
          text: 'Job has been posted successfully!'
        }).then(() => {
          this.router.navigate(['/jobpost/jobs-pending']);
        });
      }
    });
  }
 
}
