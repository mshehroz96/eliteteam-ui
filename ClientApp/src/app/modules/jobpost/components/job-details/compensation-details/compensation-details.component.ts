import { Component, OnInit } from '@angular/core';
import { LIST_TYPES } from 'src/app';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';


@Component({
  selector: 'app-compensation-details',
  templateUrl: './compensation-details.component.html',
  styleUrls: ['./compensation-details.component.css']
})
export class CompensationDetailsComponent implements OnInit {

  showSchedule: boolean = false;

  salaryFrequencies: any[] = [];
  supplementPays: any[] = [];
  benefits: any[] = [];
  gracePeriods: any[] = [];

  requisitionRequest: RequisitionRequest;
  constructor(
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
  }

  ngOnInit(): void {
    this.getBenefits();
    this.getSalaryFrequencies();
    this.getSupplementPays();
    this.getBenefitGracePeriods();
  }

  isOtherSupplement(): boolean {
    return this.requisitionRequest.supplementPay.find(x => x.displayText == 'Other')
  }
  getBenefits() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_BENEFITS).subscribe((res: any) => {
      if (res?.success) {
        this.benefits = res?.data;
      }
    });
  }

  getBenefitGracePeriods() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_GRACE_PERIOD).subscribe((res: any) => {
      if (res?.success) {
        this.gracePeriods = res?.data;
      }
    });
  }

  getSalaryFrequencies() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_SALARY_FREQUENCY).subscribe((res: any) => {
      if (res?.success) {
        this.salaryFrequencies = res?.data;
      }
    });
  }

  getSupplementPays() {
    this.commonService.getListItems(LIST_TYPES.REQUISITION_SUPPLEMENTAL_PAY).subscribe((res: any) => {
      if (res?.success) {
        this.supplementPays = res?.data;
      }
    });
  }
}
