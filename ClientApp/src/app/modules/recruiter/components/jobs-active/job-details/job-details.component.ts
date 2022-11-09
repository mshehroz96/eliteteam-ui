import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRecruitersViewComponent } from 'src/app/internal-modules/requisition/components/requisition-recruiters-view/requisition-recruiters-view.component';
import { RequisitionSummaryComponent } from 'src/app/internal-modules/requisition/components/requisition-summary/requisition-summary.component';
import { RequisitionCandidate, RequisitionCandidateStatsRM, RequisitionRMStats } from 'src/app/_models/recruitment/requisition-candidate';
import { RequisitionCandidateFilter } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionRequestService } from 'src/app/_services';
import { RecruitmentService } from 'src/app/_services/recruitment/recruitment.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  ref!: DynamicDialogRef;
  request: RequisitionCandidateFilter;
  recruiters: any[] = [];
  filters: any[] = [];
  candidates!: RequisitionCandidate[];
  candidateStats!: RequisitionCandidateStatsRM;
  requisitionsStats: RequisitionRMStats[] = [];
  currentRequisitionStats: RequisitionRMStats = {};
  totalRecords: number = 0;

  constructor(
    public loadingService:LoadingService,
    private dialogService: DialogService,
    private router:Router,
    private recruitmentService: RecruitmentService,
    private requisitionRequestService: RequisitionRequestService,
    private route: ActivatedRoute) {

    this.request = new RequisitionCandidateFilter();
    this.candidateStats=new RequisitionCandidateStatsRM();

    this.request.requisitionUuid = this.route.snapshot.params['id'];

    if (this.request.requisitionUuid && this.request.requisitionUuid?.length > 0) {
      this.getCombinedData();
    }

  }

  ngOnInit(): void {

  }

  setStatus(value: string) {
    this.request.status = value;
    this.getFilter();
    this.getData();
  }

  filterChange() {
    this.getData();
  }

  getFilter() {
    this.request.filters=[];
    this.recruitmentService.getRequisitionCandidatesFilters(this.request.status).subscribe((res) => {
      this.filters = res?.data;
    });
  }
  showApplicant(): boolean {
    switch (this.request.status) {
      case 'New_Applicants':
      case 'Pending_Application':
      case 'New_Candidate':
      case 'All':
        return true;
      default:
        return false;
    }
  }

  showCandidate(): boolean {

    switch (this.request.status) {
      case 'New_Applicants':
      case 'Pending_Application':
      case 'New_Candidate':
        return false;
      default:
        return true;
    }

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  getCombinedData() {
    this.loadingService.doLoading(
        this.recruitmentService.getRequisitionCombinedDataRM(this.request),this
    )
    .subscribe((res) => {
      if (res?.success) {

        this.candidates = res.data.candidates;
        this.candidateStats = res.data.candidateStats;
        this.requisitionRequestService.requisitionRequest$.next(res.data.requisitionDetails);
        this.recruiters = res.data.recruiters;
        this.requisitionsStats = res.data.requisitionsStats;
        this.currentRequisitionStats = this.requisitionsStats.find(x=>x.uuid==this.request.requisitionUuid)??{};
        this.totalRecords = res.totalRecords;

        console.log(res.data);
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
      this.recruitmentService.getRequisitionCandidatesByStatusRM(this.request),this
    )
    .subscribe((res) => {
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

  viewRequisitionRecruiters() {
    this.ref = this.dialogService.open(RequisitionRecruitersViewComponent, {
      header: 'Recruiters',
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
      this.ref.destroy();
    }
  }

  pageChange(rows: number) {
    this.request.rows = this.request.rows + rows;
    this.getData();
  }
}
