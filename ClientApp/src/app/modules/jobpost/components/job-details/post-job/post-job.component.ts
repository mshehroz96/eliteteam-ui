import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostJob, RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionRequestService } from 'src/app/_services';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  constructor(private ref: DynamicDialogRef,
    private config:DynamicDialogConfig,
    private requisitionRequestService:RequisitionRequestService,
    private formBuilder: FormBuilder) { 
      
      this.requisitionRequest=this.requisitionRequestService.requisitionRequest;
      this.postRequest=new PostJob();
      this.postRequest.requisitionId=this.requisitionRequest.requisitionId;

    }

  postJobForm!:FormGroup;
  requisitionRequest!:RequisitionRequest;
  postRequest!:PostJob;
  campaignType:string='';
  oneWayInterviewTemplateId: number = 0;
  ngOnInit(): void {

    this.campaignType = this.config.data.campaignType;
    this.oneWayInterviewTemplateId = this.config.data.oneWayInterviewTemplateId;

    this.postJobForm = this.formBuilder.group({
      budget: ['', Validators.required],
      postDates: [[], Validators.required]
    });
  }

  closeModal(): void {
    this.ref.close();
  }
  
  postJob()
  {
    this.postRequest=Object.assign(this.postRequest,this.postJobForm.value);

    if(this.postRequest.postDates.length>0)
    {
      this.postRequest.fromDate=this.postRequest.postDates[0];

      if(this.postRequest.postDates.length>0)
        this.postRequest.toDate=this.postRequest.postDates[1];
      else
        this.postRequest.toDate = this.postRequest.postDates[0];
    }

    this.requisitionRequestService.postJob(this.postRequest).subscribe((res)=>
    {
        if(res.success)
        {
          this.ref.close({});
        }
    });
  }
}
