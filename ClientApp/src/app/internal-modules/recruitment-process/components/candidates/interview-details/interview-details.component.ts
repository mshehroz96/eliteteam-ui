import { Component, Input, OnInit } from '@angular/core';
import { RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent implements OnInit {

  private _applicantId:number=0;
  private _campaignType: string='';
  startMeeting:boolean=false;

  applicantEncryptedId:string='';

  @Input() 
  set applicantId(value: number){
    this._applicantId=value;
    this.applicantEncryptedId=btoa(this._applicantId.toString());
    this.getInterviewDetails();
  };
  get applicantId() {
    return this._applicantId;
  };

  @Input()
  set campaignType(value: string) {
    this._campaignType = value;
  };
  get campaignType() {
    return this._campaignType;
  };

  interview?: any;
  constructor(private recruitmentService: RecruitmentService) { }

  ngOnInit() {
    
  }

  getInterviewDetails()
  {
    this.recruitmentService.getApplicantInterViewDetails(this.applicantId).subscribe((res) => {

      if (res.success) {
        this.interview = res?.data;
      }
    });
  }

  joinMeeting()
  {
      this.startMeeting=true;
      this.interview.interviewStatus='Started';
  }

}
