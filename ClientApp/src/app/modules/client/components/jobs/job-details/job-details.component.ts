import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionSummaryComponent } from 'src/app/internal-modules/requisition/components/requisition-summary/requisition-summary.component';
import { RequisitionCandidate, RequisitionCandidateStatsClient, RequisitionClientStats, RequisitionRMStats } from 'src/app/_models/recruitment/requisition-candidate';
import { RequisitionCandidateFilter } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionRequestService } from 'src/app/_services';
import { RecruitmentService } from 'src/app/_services/recruitment/recruitment.service';
import { ShareJobComponent } from '../share-job/share-job.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  ref!: DynamicDialogRef;
  request: RequisitionCandidateFilter;
  filters: any[] = [];
  recruiters:any[]=[];
  candidateStats: RequisitionCandidateStatsClient;
  requisitionsStats: RequisitionClientStats[]=[];
  currentRequisitionStats: RequisitionClientStats={};
  constructor(
    public loadingService:LoadingService,
    private dialogService: DialogService,
    private router:Router,
    private recruitmentService: RecruitmentService,
    private requisitionRequestService: RequisitionRequestService,
    private route: ActivatedRoute) {

    this.request = new RequisitionCandidateFilter();
    this.candidateStats = new RequisitionCandidateStatsClient();
    this.request.requisitionUuid = this.route.snapshot.params['id'];

    if (this.request.requisitionUuid && this.request.requisitionUuid?.length > 0) {
      this.getCombinedData();
    }

  }


  candidates!: RequisitionCandidate[];
  totalRecords: number = 0;
  ngOnInit(): void {

  }

  filterChange() {
    this.getData();
  }

  getFilter() {
    this.request.filters = [];
    this.recruitmentService.getRequisitionCandidatesFilters(this.request.status).subscribe((res) => {
      this.filters = res?.data;
    });
  }
  setStatus(value: string) {
    this.request.status = value;
    this.getFilter();
    this.getData();
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  getCombinedData() {

    this.loadingService.doLoading(
      this.recruitmentService.getRequisitionCombinedDataClient(this.request),this
    ).subscribe((res) => {
      if (res?.success) {
        
        this.candidates = res.data.candidates;
        this.requisitionRequestService.requisitionRequest$.next(res.data.requisitionDetails);
        this.candidateStats = res.data.candidateStats
        this.requisitionsStats = res.data.requisitionsStats;
        this.currentRequisitionStats=this.requisitionsStats.find(x=>x.uuid==this.request.requisitionUuid) ?? {};
        this.totalRecords = res.totalRecords;
      }
      else {
        this.candidates = [];
        this.requisitionRequestService.requisitionRequest$.next(new RequisitionRequest());
        this.recruiters = [];
        this.totalRecords = 0;
      }
    });
  }
  getData() {

    this.loadingService.doLoading(
      this.recruitmentService.getRequisitionCandidatesByStatusClient(this.request),this
    ).subscribe((res) => {
      if (res?.success) {
        this.candidates = res.data;
        this.totalRecords = res.totalRecords;
      }
      else {
        this.candidates = [];
        this.totalRecords = 0;
      }
    });
  }
  viewRequisitionSummary() {

    this.ref = this.dialogService.open(RequisitionSummaryComponent, {
      header: 'Job Summary',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  shareJob() {
    this.ref = this.dialogService.open(ShareJobComponent, {
      header: 'Job Sharing Options',
      data: {
        recruiters: this.recruiters
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  pageChange(rows:number) {
    this.request.rows = this.request.rows + rows;
    this.getData();
  }
}
