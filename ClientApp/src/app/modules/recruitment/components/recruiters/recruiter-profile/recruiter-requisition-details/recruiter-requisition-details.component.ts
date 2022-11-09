import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';

@Component({
  selector: 'app-recruiter-requisition-details',
  templateUrl: './recruiter-requisition-details.component.html',
  styleUrls: ['./recruiter-requisition-details.component.css']
})
export class RecruiterRequisitionDetailsComponent implements OnInit {

  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }
  requisitionDetail:any;
  strCompanyLogoURL:string = "";
  ngOnInit() {
    this.requisitionDetail = this.config.data.details;
  }

}
