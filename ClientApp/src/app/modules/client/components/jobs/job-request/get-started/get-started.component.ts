import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LIST_TYPES } from 'src/app';
import { Methods } from 'src/app/_helper/method';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  ProfileRequired: any[] = [];
  selectedCampaignType:string='';
  requisitionRequest: RequisitionRequest;
  campaignTypeConfig:any[]=[];
  showVideo:boolean=false;
  showResume: boolean = false;
  showInterview: boolean = false;
  minDate!: Date;
  constructor(
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
  }

  getRoundedDate(minutes: number, d = (new Date())) {

    let ms = 1000 * 60 * minutes;

    let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

    return roundedDate
  }

  ngOnInit(): void {
    this.getCampaignTypeConfig();
    this.getNoOfPositions();

    this.minDate = this.getRoundedDate(5);
  }
  getCampaignTypeConfig()
  {
    this.requisitionRequestService.getCampaignTypesThreshold().subscribe((res)=>
    {
        if(res.success)
        {
          console.log(res);
          this.campaignTypeConfig=res.data;

          this.showVideo = this.campaignTypeConfig.find((x:any)=>x.Key=='Video' && x.Value=='Yes')?true:false;
          this.showResume = this.campaignTypeConfig.find((x: any) => x.Key == 'Resume' && x.Value == 'Yes') ? true : false;
          this.showInterview = this.campaignTypeConfig.find((x: any) => x.Key == 'Interview' && x.Value == 'Yes') ? true : false;
        }
    });
  }


  getStarted(type:string){
    this.selectedCampaignType = type;
  }
  getContinue(type:string)
  {
    this.requisitionRequest.campaignType=type;
    this.requisitionRequest.availabilityDateFrom = new Date(this.requisitionRequest.availabilityDateFrom + ' ' + this.requisitionRequest.availabilityTimeFrom);
    this.requisitionRequest.availabilityDateTo = new Date(this.requisitionRequest.availabilityDateTo + ' ' + this.requisitionRequest.availabilityTimeTo);
    this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest);

  }

  getNoOfPositions() {
    this.commonService.getListItems(LIST_TYPES.CAMPAIGN_INTERVIEW_PROFILE_REQUIRIED).subscribe((res: any) => {
      if (res?.success) {
        this.ProfileRequired = res?.data;
      }
    });
  }
}
