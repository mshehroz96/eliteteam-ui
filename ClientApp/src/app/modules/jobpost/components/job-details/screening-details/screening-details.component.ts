import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionScreeningQuestionsStatus, ScreeningQuestion } from 'src/app/_models/requisition/screening-question';
import { CommonService } from 'src/app/_services/common/common.service';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import { QuestionDetailsComponent } from './question-details/question-details.component';

@Component({
  selector: 'app-screening-details',
  templateUrl: './screening-details.component.html',
  styleUrls: ['./screening-details.component.css']
})
export class ScreeningDetailsComponent implements OnInit {

  questionCategories: any[] = [];
  questions: any[] = [];

  requisitionRequest: RequisitionRequest;
  constructor(
    private requisitionRequestService: RequisitionRequestService,
    private readonly commonService: CommonService,
    private readonly dialogService: DialogService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;
  }

  ngOnInit(): void {
    
  }

  setQuestionStatus(question:ScreeningQuestion,status: string) {
    let obj = new RequisitionScreeningQuestionsStatus();
    
    question.jpmApprovalStatus = status;

    obj.requisitionId = this.requisitionRequest.requisitionId;
    obj.ids.push(question.screeningQuestionId);
    obj.jpmApprovalStatus = question.jpmApprovalStatus;

    this.updateRequisitionScreeningQuestionsStatus(obj);
  }

  setQuestionsStatus(status:string) 
  {
    let obj = new RequisitionScreeningQuestionsStatus();
    
    obj.requisitionId = this.requisitionRequest.requisitionId;
    obj.jpmApprovalStatus = status;

    this.requisitionRequestService.requisitionRequest.screeningQuestions.filter(x=>x.selected).forEach((question)=>
    {
      question.jpmApprovalStatus = status;
      obj.ids.push(question.screeningQuestionId);
    });

    this.updateRequisitionScreeningQuestionsStatus(obj);
  }

  ref!: DynamicDialogRef;

  editQuestion(question:ScreeningQuestion) {
    this.ref = this.dialogService.open(QuestionDetailsComponent, {
      header: 'Configure Screening Question',
      data: {
        id: question.requisitionScreeningQuestionId,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((question: any) => {
      console.log(question);
    });

  }
  private updateRequisitionScreeningQuestionsStatus(status: RequisitionScreeningQuestionsStatus)
  {
    this.requisitionRequestService.updateRequisitionScreeningQuestionsStatus(status).subscribe((res) => {
      console.log(res);
    });
  }  
}
