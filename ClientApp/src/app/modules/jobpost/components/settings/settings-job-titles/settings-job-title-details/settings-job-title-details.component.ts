import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { RequisitionJPMPendingFilter } from 'src/app/_models/requisition/requisitionJPMPendingFilter';
import { CommonService } from 'src/app/_services/common/common.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { first } from 'rxjs';
import { RequisitionService } from 'src/app/_services/requisition/requisition.service';
import { JobTitleService } from 'src/app/_services/jobtitle/jobtitle.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { createOrUpdateJobTitleRequest } from 'src/app/_models/jobtitle/createOrUpdateJobTitleRequest';
import { jobTitleDetailsResponse } from 'src/app/_models/jobtitle/jobTitleDetailsResponse';
import Swal from 'sweetalert2';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddJobTitleCategoryComponent } from './add-job-title-category/add-job-title-category.component';
import { AddAssociatedJobsComponent } from './add-associated-jobs/add-associated-jobs.component';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
@Component({
  selector: 'settings-job-title-details',
  templateUrl: './settings-job-title-details.component.html',
  styleUrls: ['./settings-job-title-details.component.css']
})
export class SettingsJobTitleDetailsComponent implements OnInit {
  objCreateOrUpdateJobTitleRequest: createOrUpdateJobTitleRequest;
  objJobTitleDetailsResponse: jobTitleDetailsResponse;

  intJobTitleId: number = 0;
  arrOneWayInterviewCategoryQuestions: any[] = [];
  arrScreeningQuestionCategoryQuestions: any[] = [];

  nodes: any[] = [];
  selectedNode: any;

  questionCategories: any[] = [];
  questions: any[] = [];

  arrOneWayInterviewTemplateQuestions: any[] = [];
  strOneWayInterviewTemplateQuestionsHTML: string = "";

  intSelectedLookupItem_OneWayInterviewTemplate: number = 0;
  arrLookupItems_OneWayInterviewTemplates: any[] = [];
  ref!: DynamicDialogRef;
  screeningQuestions:any = [];
  screeningQuestionsList:any = [];
  associatedJobs :any = [];
  constructor(
    private route: ActivatedRoute,
    private requisitionService: RequisitionService,
    private readonly commonService: CommonService,
    private readonly jobTitleService: JobTitleService,
    private readonly oneWayInterviewService: OneWayInterviewService,
    private readonly authenticationService: AuthenticationService,
    private dialogService: DialogService,
    public loadingService: LoadingService,
    
    ) {
      this.objCreateOrUpdateJobTitleRequest = new createOrUpdateJobTitleRequest();
      this.objJobTitleDetailsResponse = new jobTitleDetailsResponse();
  }

  ngOnInit() {
    this.intJobTitleId = this.route.snapshot.params['id'];
    this.getJobTitleDetailsById(this.intJobTitleId);
    this.getJobTitleDomains();
    this.getJPMJobTitleScreeningQuestions();
    this.getJobTitleCategories();
  }
  getJobTitleCategories(){
    this.commonService.getJobTitleCategories(this.intJobTitleId).subscribe((res: any) => {
      if (res?.success) {
        this.associatedJobs = res?.data;
      }
    });
  }
  getJPMJobTitleScreeningQuestions() {
    this.jobTitleService.getJPMJobTitleScreeningQuestions(this.intJobTitleId).subscribe((res: any) => {
      if (res?.success) {
        this.screeningQuestions = res?.data;
        if(this.screeningQuestions.length > 0){
          if(this.screeningQuestions[0].screeningQuestionsCategories.length > 0){
           this.screeningQuestionsList = this.screeningQuestions[0].screeningQuestionsCategories; 
          }
        }
      }
    });
  }
  getOneWayInterviewTemplates() {
    this.oneWayInterviewService.getInterviewTemplates().subscribe((res: any) => {
      if (res?.success) {
        this.arrLookupItems_OneWayInterviewTemplates = res?.data;
        
      }
    });
  }


  updateJobTitle(){
    console.log("updating starts")
    this.objCreateOrUpdateJobTitleRequest.jobTitleId = this.objJobTitleDetailsResponse.jobTitleId;
    this.objCreateOrUpdateJobTitleRequest.title = this.objJobTitleDetailsResponse.jobTitle;
    this.objCreateOrUpdateJobTitleRequest.jobDescription = this.objJobTitleDetailsResponse.jobDescription;
    this.objCreateOrUpdateJobTitleRequest.oneWayInterviewTemplateID = 1; //TODO:hardcoding
    this.objCreateOrUpdateJobTitleRequest.screeningQuestionCategoryIDs = []; //TODO:hardcoding as null temporarily
    this.loadingService.doLoading(
    this.jobTitleService.createOrUpdateJobTitle(this.objCreateOrUpdateJobTitleRequest),this)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Successfully updated');
        },
        error: error => {
          console.log('Error', error);
        }
      });

    console.log("updating ends")

  }



  getJobTitleDetailsById(id: number) {
    this.jobTitleService.getJobTitleDetailsById(id).subscribe((res: any) => {
      if (res?.success) {
        this.objJobTitleDetailsResponse = res?.data;
        
        // for (var i = 0; i < this.objJobTitleDetailsResponse.oneWayInterviewTemplate.length; i++) {

        //   if (this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].oneWayInterviewTemplateId == id) {
        //     for (var j = 0; j < this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].questions.length; j++) {
        //       this.arrOneWayInterviewCategoryQuestions.push(this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].questions[j]);
        //     }
        //     break;
        //   }
        // }


      }
    });
  }
  populateScreeningQuestionCategoriesQuestionsByCategoryId(array: any[]) {
    this.screeningQuestionsList = array;
    
  }
  

  // populateScreeningQuestionCategoriesQuestionsByCategoryId(id: number) {
  //   this.arrScreeningQuestionCategoryQuestions = [];

  //   for (var i = 0; i < this.objJobTitleDetailsResponse.screeningQuestionsCategories.length; i++) {
  //     console.log(this.objJobTitleDetailsResponse.screeningQuestionsCategories[i].screeningCategoryId == id)
  //     if (this.objJobTitleDetailsResponse.screeningQuestionsCategories[i].screeningCategoryId == id) {
  //       for (var j = 0; j < this.objJobTitleDetailsResponse.screeningQuestionsCategories[i].screeningCategoryQuestions.length; j++) {
  //         this.arrScreeningQuestionCategoryQuestions.push(this.objJobTitleDetailsResponse.screeningQuestionsCategories[i].screeningCategoryQuestions[j]);
  //       }
  //       break;
  //     }
  //   }
  // }


  getOneWayInterviewQuestionsByTemplateId(objSelectedItem:any) {
    var intSelectedItemId = objSelectedItem.target.value;
    this.arrOneWayInterviewTemplateQuestions = [];

    for (var i = 0; i < this.objJobTitleDetailsResponse.oneWayInterviewTemplate.length; i++) {
      if (this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].oneWayInterviewTemplateId == intSelectedItemId) {
        for (var j = 0; j < this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].questions.length; j++) {
          this.arrOneWayInterviewTemplateQuestions.push(this.objJobTitleDetailsResponse.oneWayInterviewTemplate[i].questions[j]);
        }
        break;
      }
    }
  }
  updateJobDescription(jobDescription:string){
    if(jobDescription){
      let item: any = 
      { 
        jobTitleId: this.intJobTitleId, 
        jobDescription: jobDescription
      };
      this.loadingService.doLoading(
      this.jobTitleService.updateJobDescription(item),this).subscribe((res: any) => {
        if (res?.success) {
          Swal.fire({
            title: 'Success',
            text: 'Job description has been updated successfully.',
            icon: 'success',
          }).then((result) => {
            
          });
          this.getJobTitleDetailsById(this.intJobTitleId);
        }
      });
    }
    
  }
  changeOneWayInterviewTemplate(){
    this.intJobTitleId
    if(this.intSelectedLookupItem_OneWayInterviewTemplate){
      let item: any = 
      { 
        jobTitleId: this.intJobTitleId, 
        oneWayInterviewTemplateID: this.intSelectedLookupItem_OneWayInterviewTemplate,
      };
      this.loadingService.doLoading(
      this.jobTitleService.updateJOneWayInterviewTemplate(item),this).subscribe((res: any) => {
        if (res?.success) {
          Swal.fire({
            title: 'Success',
            text: 'One way interview template has been updated successfully.',
            icon: 'success',
          }).then((result) => {
            
          });
          this.getJobTitleDetailsById(this.intJobTitleId);
        }
      });
    }

  }
  addJobTitleCategories(){
    const selected =
    this.screeningQuestions.map((row: { screeningQuestionCategoryId: any }) => {
            return row.screeningQuestionCategoryId
          });
    var unique = selected.filter((value: any,index: any) => {
        return selected.indexOf(value) == index;
    })
    console.log(unique);
    this.ref = this.dialogService.open(AddJobTitleCategoryComponent, {
      data:{
        id:this.intJobTitleId,
        selected:unique
      },
      header: 'Add Screening Question Category',
      width: '50%',
      height:"50%",
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getJPMJobTitleScreeningQuestions();
      }
    })
  }
  getJobTitleDomains(){
    
  }
  openAddAssociatedJobs(){
    this.ref = this.dialogService.open(AddAssociatedJobsComponent, {
      data:{
        id:this.intJobTitleId
      },
      header: 'Add Associated Jobs',
      width: '50%',
      height:"50%",
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res) => {
      this.getJobTitleCategories();
    })
  }

}
