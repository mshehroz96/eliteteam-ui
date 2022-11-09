import { Component, Input, OnInit } from '@angular/core';
import { OfferDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RecruitmentService } from 'src/app/_services';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {

  private _applicantId:number=0;

  @Input() set applicantId(value: number) {
    this._applicantId = value;

    console.log(value);

    this.getOfferDetails();
  };
  get applicantId() {
    return this._applicantId;
  };

  offerDetail!:OfferDetail;
  constructor(private recruitmentService:RecruitmentService) { 
    this.offerDetail = new OfferDetail();
  }

  ngOnInit() {
  }

  getOfferDetails(){
    this.recruitmentService.getApplicantOfferDetails(this.applicantId).subscribe((res)=>{

      console.log(res);

        if(res.success){
          this.offerDetail=res.data;
        }
    });
  }

}
