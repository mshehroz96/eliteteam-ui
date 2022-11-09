import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';
import { AddJobCandidateDto, ShareCandidateToClientDto } from 'src/app/_models/showcase/showcase';
import { ShowcaseService } from 'src/app/_services/showcase/showcase.service';
import { CommonService } from 'src/app/_services/common/common.service';
import Swal from 'sweetalert2';
import { RecruiterShowcasefilter } from 'src/app/_models/recutiter/recruiterhowcasefilter';


@Component({
  selector: 'app-recruiter-showcase-view',
  templateUrl: './recruiter-showcase-view.component.html',
  styleUrls: ['./recruiter-showcase-view.component.css']
})
export class RecruiterShowcaseViewComponent implements OnInit {

  display: boolean = false;
  showCaseUUID: any = 0;
  totalRecords: number = 0;
  blocked: boolean = false;
  candidateList: any[] = [];
  candidateJobs: any[] = [];
  showcaseTitle: any = "";
  first: number = 1;
  rows: number = 10;
  selectedClientUser: any = [];
  allClientUsers: any[] = [];
  noCandidateAdded: any = 'There is no candidate added yet.';
  addJobCandidate: AddJobCandidateDto = {
    candidates: [],
    requisitionID: 0
  };

  shareCandidates: ShareCandidateToClientDto = {
    candidates: [],
    clients: [],
    message: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private showcaseService: ShowcaseService,
    private commonService : CommonService
  ) { }

  ngOnInit(): void {
    this.showCaseUUID = this.activatedRoute.snapshot.params['id'];
    this.getShowCaseCandidates({});
  }

  getShowCaseCandidates(params: ClientShowCaseFilter) {
    this.blocked = true;
    params.showCaseUUID = this.showCaseUUID;
    params.sqlCondition = "";
    params.sqlCondition = "";
    params.userId = 0;
    this.showcaseService.getCandidateShowCaseDetail(params).subscribe((res) => {
      this.blocked = false;

      if (res.success) {
        this.candidateList = res.data;
        this.showcaseTitle = this.candidateList[0].showCaseTitle;
        this.totalRecords = res.totalRecords;
        this.candidateJobs = res.candidateJobs;
        this.blocked = false;
      }

    });
  }

  paginate(event: any) {

    this.first = event.page + 1;
    this.getShowCaseCandidates({});
  }

  filterUser(item:any) : any
  {
    return item.firstName != null;
  }

}

