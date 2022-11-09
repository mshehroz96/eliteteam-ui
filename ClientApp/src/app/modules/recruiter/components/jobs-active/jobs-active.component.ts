import { Component, OnInit } from '@angular/core';
import { RequisitionJPMActiveFilter } from 'src/app/_models/requisition/requisitionJPMActiveFilter';
import { CommonService } from 'src/app/_services/common/common.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { RequisitionService } from 'src/app/_services/requisition/requisition.service';
import { RequisitionRecruiterActiveFilter } from 'src/app/_models/requisition/requisitionRecruiterActiveFilter';
import { FILES_PATHS } from 'src/app';

@Component({
  selector: 'app-jobs-active',
  templateUrl: './jobs-active.component.html',
  styleUrls: ['./jobs-active.component.css'],
})
export class JobsActiveComponent implements OnInit {
  jobs: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;

  company: number = 0;
  companies: any[] = [];

  constructor(private requisitionService: RequisitionService,
    private readonly commonService: CommonService,
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getClientsByRecruiter();
  }

  getClientsByRecruiter() {
    this.commonService.getClientsByRecruiter(6).subscribe((res: any) => {
      if (res?.success) {
        this.companies = res?.data;
      }
    });
  }

  getJobs(params: RequisitionRecruiterActiveFilter) {
    this.loading = true;
    params.listType = 'Empty';
    params.filter1 = this.company;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.requisitionService.getRequisitionsRecruiterActive(params).subscribe((res) => {
      if (res?.success) {
        this.jobs = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;

        this.jobs.forEach(item => {
         item.recruiters = JSON.parse(item.recruiters);
        });

      }
    });
  }
}
