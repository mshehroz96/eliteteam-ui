import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { RequisitionFilter } from 'src/app/_models/requisition/requisition-filter';
import { RequisitionStatus } from 'src/app/_models/requisition/requisition-status';
import { RequisitionRequestService } from 'src/app/_services';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionService } from 'src/app/_services/requisition/requisition.service';
import Swal from 'sweetalert2';
import { JobFeedbackComponent } from './job-feedback/job-feedback.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  campaignType: number = 0;
  loading: boolean = false;
  campaignTypes:any[]=[];
  jobStatus:string='Active';
  
  constructor(
    private readonly requisitionService: RequisitionService,
    private requisitionRequestService:RequisitionRequestService,
    private readonly commonService: CommonService, 
    public dialogService: DialogService) { }

  ref!: DynamicDialogRef;

  closeJob(id:number) {
    this.ref = this.dialogService.open(JobFeedbackComponent, {
      header: 'Close Job',
      data: {
        id: id,
        action:'Close'
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((job: any) => {
      if (job) {
        this.getJobs({});
      }
    });
  }
  
  cancelJob(id: number) {
    this.ref = this.dialogService.open(JobFeedbackComponent, {
      header: 'Cancel Job',
      data: {
        id: id,
        action: 'Cancel'
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((job: any) => {
      if (job) {
        this.getJobs({});
      }
    });
  }

  archiveJob(id: number) {
    this.ref = this.dialogService.open(JobFeedbackComponent, {
      header: 'Archive Job',
      data: {
        id: id,
        action: 'Archive'
      },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((job: any) => {
      if (job) {
        this.getJobs({});
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnInit() {
    this.getCampaignTypes();
  }

  getCampaignTypes() {
    this.commonService.getListItems(LIST_TYPES.CAMPAIGN_TYPE).subscribe((res: any) => {
      if (res?.success) {
        this.campaignTypes = res?.data;
      }
    });
  }
  setJobStatus(status:string)
  {
    this.jobStatus=status;
    this.getJobs({});
  }

  getJobs(params: RequisitionFilter) {
    this.loading = true;
    params.campaignType = this.campaignType;
    params.jobStatus = this.jobStatus;
    params.globalFilter = this.searchFilter;
    this.requisitionService.getRequisitions(params).subscribe((res) => {
      if (res?.success) {
        this.jobs = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  deleteJob(requisitionId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this job!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {

        this.requisitionRequestService.updateRequisitionStatus({ "requisitionId": requisitionId, "status": "Delete" } as RequisitionStatus).subscribe((res) => {
          if (res.success) {
            this.getJobs({});
          }
        });
      }
    });
    
   
  }
}
