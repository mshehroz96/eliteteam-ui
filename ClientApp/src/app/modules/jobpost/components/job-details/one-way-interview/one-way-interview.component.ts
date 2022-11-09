import { Component, OnInit } from '@angular/core';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';

@Component({
  selector: 'app-one-way-interview',
  templateUrl: './one-way-interview.component.html',
  styleUrls: ['./one-way-interview.component.css']
})
export class OneWayInterviewComponent implements OnInit {

  templates!: OneWayInterviewTemplate[];
  defaultTemplate!: OneWayInterviewTemplate;
  constructor(public requisitionRequestService: RequisitionRequestService, private oneWayInterviewService: OneWayInterviewService) 
  {
    this.defaultTemplate = new OneWayInterviewTemplate();

    this.oneWayInterviewService.getInterviewTemplates().subscribe((res) => {
      if (res?.success) {
        this.templates = res.data;
      }
    });

    if (this.requisitionRequestService.requisitionRequest.jobTitle.oneWayInterviewTemplateId>0)
    {
      this.oneWayInterviewService.getInterviewTemplate
      (this.requisitionRequestService.requisitionRequest.jobTitle.oneWayInterviewTemplateId)
        .subscribe((res)=>{
          if(res.success)
          {
            this.defaultTemplate=res.data;
          }
      });
    }
  }

  ngOnInit(): void 
  {
    
  }
  templateChanged(template:OneWayInterviewTemplate)
  {
      this.requisitionRequestService.requisitionRequest.jobTitle.oneWayInterviewTemplateId=template.oneWayInterviewTemplateId;
  }
}
