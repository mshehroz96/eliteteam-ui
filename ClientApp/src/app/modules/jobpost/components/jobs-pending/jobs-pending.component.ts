import { Component, OnInit } from '@angular/core';
import { RequisitionJPMPendingFilter } from 'src/app/_models/requisition/requisitionJPMPendingFilter';
import { CommonService } from 'src/app/_services/common/common.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { RequisitionService } from 'src/app/_services/requisition/requisition.service';
import { FILES_PATHS, LIST_TYPES } from 'src/app';

@Component({
  selector: 'app-jobs-pending',
  templateUrl: './jobs-pending.component.html',
  styleUrls: ['./jobs-pending.component.css'],
})
export class JobsPendingComponent implements OnInit {
  jobs: any[] = [];

  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  jpmStatus: number = 0;
  jpmStatuses: any[] = [];

  constructor(private requisitionService: RequisitionService,
    private readonly commonService: CommonService) { }

  ngOnInit() {
    this.getJPMStatuses();
  }

  getJPMStatuses() {
    this.commonService.getListItems(LIST_TYPES.JPM_REQUISITION_STATUS).subscribe((res: any) => {
      if (res?.success) {
        this.jpmStatuses = res?.data;
      }
    });
  }

  getJobs(params: RequisitionJPMPendingFilter) {
    this.loading = true;
    params.listType = 'Empty';
    params.filter1 = this.jpmStatus;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.requisitionService.getRequisitionsJPMPending(params).subscribe((res) => {
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
