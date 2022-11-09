import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';
import { RecruiterActiveJobsFilter } from 'src/app/_models/recutiter/recruiterActiveJobsFilter';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';
import { RecruiterRequisitionDetailsComponent } from '../recruiter-requisition-details/recruiter-requisition-details.component';

@Component({
  selector: 'app-recruiter-inactive-jobs',
  templateUrl: './recruiter-inactive-jobs.component.html',
  styleUrls: ['./recruiter-inactive-jobs.component.css']
})
export class RecruiterInactiveJobsComponent implements OnInit {

  activeJobs: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  industryid:  number = 0;
  clientIndustries: any[] = [];
  id:number = 0;
  canceledJobs:number = 0;
  ref!: DynamicDialogRef;
  constructor(
    private readonly recruiterService: RecruiterService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.id =
    this.route.snapshot.paramMap.get('id') == null
      ? 0
      : Number(this.route.snapshot.paramMap.get('id'));
  }

  getActiveJobs(params: RecruiterActiveJobsFilter) {
    
    this.loading = true;
    params.filter1 = this.industryid;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    params.userId = this.id;
    params.activeInactive = 2;
    if(this.canceledJobs && this.canceledJobs > 0 ){
      params.activeInactive = 288
    }
    
    

    this.recruiterService.getRecruitersJobs(params).subscribe((res) => {
      if (res?.success) {
        this.activeJobs = res?.data;
        this.activeJobs.forEach(x =>  {
          x.logoFileName = FILES_PATHS.MAP_COMPANY_LOGO(x.logoFileName)
       });
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  openRequisitionDetails(details:any) {
    this.ref = this.dialogService.open(RecruiterRequisitionDetailsComponent, {
      header: details.title,
      data: {
        details: details
      },
      width: '50%',
      height:'100%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getActiveJobs({});
    });
  }

}