
import { Component, OnInit } from '@angular/core';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';


@Component({
  selector: 'app-candidate-jobs',
  templateUrl: './candidate-jobs.component.html',
  styleUrls: ['./candidate-jobs.component.css']
})
export class CandidateJobsComponent implements OnInit {

  constructor(
    private candidateService : CandidateService,

  ) { }

  jobs: any[] = [];
  blocked : boolean = false;
  candidateFilter : candidatefilter = {};
  ngOnInit(): void {
    this.getDashboardData();
  }


  getDashboardData(){
    this.blocked = true;
    this.candidateFilter.candidateUserId = 0;
    this.candidateFilter.requisitionUUID = "";
    this.candidateService.getCandidateAllRequisitions(this.candidateFilter).subscribe((res) => {
        if(res?.success){

          this.jobs = res.data;
          console.log(this.jobs);
        }
        this.blocked = false;
    });
  }

  getClassName(item:any):any{
    if(item.campaignType == "Video"){
      return 'bx bxs-video align-top';
    }
    else if(item.campaignType == "Interview"){
      return 'bx bxs-calendar-check align-top';
    }
  }

  getStatusClassName(item:any):any{
    if(item.candidateStatusId == 277 || item.candidateStatusId == 278 || item.candidateStatusId == 280){
      return 'badge bg-success';
    }
    else if(item.candidateStatusId == 266 || item.candidateStatusId == 268 || item.candidateStatusId == 270
      || item.candidateStatusId == 271 || item.candidateStatusId == 273 || item.candidateStatusId == 275){
        return 'badge bg-warning';
    }
    else if(item.candidateStatusId == 265 || item.candidateStatusId == 267 || item.candidateStatusId == 269
      || item.candidateStatusId == 272 || item.candidateStatusId == 274 || item.candidateStatusId == 276
      || item.candidateStatusId == 350 || item.candidateStatusId == 407 || item.candidateStatusId == 414){
        return 'badge bg-primary';
    }
    else if(item.candidateStatusId == 349 || item.candidateStatusId == 348 || item.candidateStatusId == 279){
      return 'badge bg-danger';
    }
  }

}
