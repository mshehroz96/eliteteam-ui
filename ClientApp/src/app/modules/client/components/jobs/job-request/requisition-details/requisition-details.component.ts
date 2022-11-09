import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { first } from 'rxjs';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { AuthenticationService } from 'src/app/_services';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';


@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html',
  styleUrls: ['./requisition-details.component.css']
})
export class RequisitionDetailsComponent implements OnInit {

  @ViewChild('attachment') attachment!: FileUpload; 
  requisitionRequest: RequisitionRequest;
  jobTitles: any[] = [];
  jobTitleCategories: any[] = [];
  
  constructor(
    public loadingService:LoadingService,
    private authService:AuthenticationService,
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;

    if(this.requisitionRequest.requisitionId==0)
      this.requisitionRequest.companyId = authService.currentUserValue.companyId;
  }

  ngOnInit() {
    if (this.requisitionRequest.jobTitle.jobTitleId > 0) {
      this.setJobTitle(this.requisitionRequest.jobTitle);
    }
  }

  nextPage() {

    if (this.attachment._files.length > 0) {
      this.commonService.uploadFile(this.attachment._files[0], FILES_PATHS.UPLOAD_REQUISITION_ATTACHMENTS)
        .subscribe((res: any) => {
          this.requisitionRequest.attachmentFileName = res?.data.name;
          this.requisitionRequest.attachmentOriginalFileName = res?.data.originalFileName;
          this.requisitionRequestService.requisitionRequest.attachmentFileName = res?.data.name;
          this.requisitionRequestService.requisitionRequest.attachmentOriginalFileName = res?.data.originalFileName;

          console.log(res?.data);

        });
    }

    

    this.requisitionRequestService.requisitionRequest$.next(this.requisitionRequest);
    this.requisitionRequestService.activeStepIndex.next(1);
  }

  

  nexFields(section: string) {
    switch (section) {
      case 'JobDescription':
        this.requisitionRequest.showJobDescription = true;
        break;
      case 'Position':
        this.requisitionRequest.showPosition = true;
        break;
      case 'Attachment':
        this.requisitionRequest.showAttachment = true;
        break;
    }
  }

  searchJobTitles(event: any) {
    
    this.commonService.searchJobTitles({ query: event.query }).subscribe((res: any) => {
      if (res?.success) {
        this.jobTitles = res?.data;
      }
    });

  }

  setJobTitle(obj: any) {

    this.commonService.getJobTitleCategories(obj.jobTitleId).subscribe((res: any) => {
      if (res?.success) {
        this.jobTitleCategories = res?.data;
      }
    });
  }

  setJobTitleCategory(obj: any) {
    this.requisitionRequest.jobTitleCategory = obj;
  }

  clearJobTitle(obj: any) {
    this.requisitionRequest.jobTitle = {};
    this.requisitionRequest.jobTitleCategory = {};
    this.jobTitleCategories = [];
  }

  setPreDefinedJobDes() {
    if (this.requisitionRequest.predefinedJobDescription == true && this.requisitionRequest.jobTitle)
      this.requisitionRequest.jobDescription = this.requisitionRequest.jobTitle.jobDescription;
    else
      this.requisitionRequest.jobDescription = '';
  }
}
