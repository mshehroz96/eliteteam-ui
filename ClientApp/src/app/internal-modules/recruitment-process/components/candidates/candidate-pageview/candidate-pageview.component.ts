import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequisitionCandidate } from 'src/app/_models/recruitment/requisition-candidate';
import { RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-candidate-pageview',
  templateUrl: './candidate-pageview.component.html',
  styleUrls: ['./candidate-pageview.component.css']
})
export class CandidatePageviewComponent implements OnInit {

  @Input('candidate') candidate!: RequisitionCandidate;
  @Input('first') first: number=0;
  @Input('rows') rows: number = 1;
  @Input('totalRecords') totalRecords: number = 0;
  @Output('candidateChanged') candidateChanged=new EventEmitter<number>();
  
  constructor(private recruitmentService:RecruitmentService) { }

  ngOnInit() {
  }

  showNext():boolean
  {
    return (this.totalRecords>1 && this.first!=this.totalRecords-1)?true:false;
  }

  showPrevious(): boolean {
    return this.first >0 && this.totalRecords>1 ? true : false;
  }

  gotoPreviousCandidate()
  {
    this.candidateChanged.emit(this.first-1);
  }
  gotoNextCandidate() {
    this.candidateChanged.emit(this.first+1);
  }

  allowRating():boolean
  {
    let status:string[]= ["New Applicant"];
    return status.includes(this.candidate.status) && this.candidate.recruiterRating<=0;
  }
  setRating(event:any)
  {
    console.log(event);
    
    this.recruitmentService.setApplicantRating({"applicantId":this.candidate.applicantId,"rating":event.value}).subscribe((x)=>
    {
        this.candidate.recruiterRating=event.value;
    });
  }

}
