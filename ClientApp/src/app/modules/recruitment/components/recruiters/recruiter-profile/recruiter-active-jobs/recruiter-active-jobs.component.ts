import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';
import { RecruiterActiveJobsFilter } from 'src/app/_models/recutiter/recruiterActiveJobsFilter';
import { RecruiterService } from 'src/app/_services';
import { ReAssignRequisitionRecruitersComponent } from '../re-assign-requisition-recruiters/re-assign-requisition-recruiters.component';
import { RecruiterRequisitionDetailsComponent } from '../recruiter-requisition-details/recruiter-requisition-details.component';

@Component({
  selector: 'app-recruiter-active-jobs',
  templateUrl: './recruiter-active-jobs.component.html',
  styleUrls: ['./recruiter-active-jobs.component.css']
})
export class RecruiterActiveJobsComponent implements OnInit {

  activeJobs: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  industryid:  number = 0;
  clientIndustries: any[] = [];
  id:number = 0;
  ref!: DynamicDialogRef;
  companies:any[] = [];
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
      this.getRecruiterCompanies();
  }

  getActiveJobs(params: RecruiterActiveJobsFilter) {
    this.loading = true;
    params.filter1 = this.industryid;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    params.userId = this.id;
    params.activeInactive = 1;
    
    

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
  open() {
    this.ref = this.dialogService.open(ReAssignRequisitionRecruitersComponent, {
      header: 'Re-Assignment',
      // data: {
      //   id: this.id,
      //   action: 'Add'
      // },
      width: '60%',
      height:'60%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getActiveJobs({});
    });
  }
  getRecruiterCompanies() {
    this.recruiterService.getRecruiterCompanies(this.id).subscribe((res: any) => {
      if (res && res?.data) {
        this.companies = res?.data;
      }
    })
  }
  getRequisitionDetails(requisitionId:number){
    this.recruiterService.getRequisitionDetails(this.id).subscribe((res: any) => {
      if (res && res?.data) {
        this.companies = res?.data;
      }
    })
  }
  openRequisitionDetails(details:any) {
    this.ref = this.dialogService.open(RecruiterRequisitionDetailsComponent, {
      header: details.title,
      data: {
        details: details
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getActiveJobs({});
    });
  }

}
