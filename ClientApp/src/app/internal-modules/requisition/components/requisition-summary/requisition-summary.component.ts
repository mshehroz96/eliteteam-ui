import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { ScreeningQuestion } from 'src/app/_models/requisition/screening-question';
import { RequisitionRequestService } from 'src/app/_services';

@Component({
  selector: 'app-requisition-summary',
  templateUrl: './requisition-summary.component.html',
  styleUrls: ['./requisition-summary.component.css']
})
export class RequisitionSummaryComponent implements OnInit {

  @Input() requisitionRequest!: RequisitionRequest;
  approvedScreeningQuestions:ScreeningQuestion[]=[];
  constructor(private requisitionRequestService: RequisitionRequestService) {
    
    if (!this.requisitionRequest)
    {
      this.requisitionRequest=requisitionRequestService.requisitionRequest;
      this.approvedScreeningQuestions=this.requisitionRequest.screeningQuestions.filter((x)=>x.jpmApprovalStatus=='Approved');
    }
  }

  ngOnInit(): void {

  }

}
