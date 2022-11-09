import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { OneWayInterviewTemplate } from 'src/app/_models/one-way-interview/one-way-interview-template';
import { CommonService } from 'src/app/_services/common/common.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})

export class TemplateDetailsComponent implements OnInit {

  template: OneWayInterviewTemplate;
  submitted: boolean = false;
  suggestions: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private oneWayInterviewService: OneWayInterviewService,
    private commonService:CommonService) {
    this.template = new OneWayInterviewTemplate();
  }

  ngOnInit(): void {

    this.template.oneWayInterviewTemplateId = Number(this.config.data.id);
    
    if(this.template.oneWayInterviewTemplateId>0)
    {
      this.oneWayInterviewService.getInterviewTemplate(this.template.oneWayInterviewTemplateId).subscribe((res)=>
      {
        if(res?.success)
        {
          this.template = res.data;
        }

      });
    }

  }

  searchJobTitles(event: any) {

    this.commonService.searchJobTitles({ query: event.query }).subscribe((res: any) => {
      if (res?.success) {
        this.suggestions = res?.data;
      }
    });
  }

  closeModal(): void {
    this.ref.close(this.template);
  }

  
  saveTemplate()
  {
    this.submitted = true;
    console.log(this.template);
    this.oneWayInterviewService.createOrUpdateInterviewTemplate(this.template)
      .pipe(first())
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: error => {
          console.log('Error', error);
        }
      });
  }
}
