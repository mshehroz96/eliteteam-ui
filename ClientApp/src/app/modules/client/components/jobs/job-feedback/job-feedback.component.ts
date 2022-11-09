import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RequisitionFeedback } from 'src/app/_models/requisition/feedback/requisition-feedback';
import { RequisitionFeedbackService } from 'src/app/_services/requisition/feedback/requisition-feedback.service';

@Component({
  selector: 'app-close-job',
  templateUrl: './job-feedback.component.html',
  styleUrls: ['./job-feedback.component.css']
})
export class JobFeedbackComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback: RequisitionFeedback;
  submitted: boolean = false;
  get f() { return this.feedbackForm.controls; }
  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private readonly feedbackService: RequisitionFeedbackService) {
    this.feedback = new RequisitionFeedback();
  }

  ngOnInit(): void {
    
    this.feedback.requisitionId = Number(this.config.data.id);
    this.feedback.action = this.config.data.action;

    this.feedbackForm = this.formBuilder.group({
      rating: ['', Validators.required],
      remarks: ['', Validators.required],
      noofHires: ['', Validators.required],
      successfullyCompleted: ['', Validators.required],
    });
  }
  closeModal(): void {
    this.ref.close(this.feedback);
  }

  onSubmit() {
    
    this.submitted = true;
    
    this.feedback.rating = Number(this.feedbackForm.value.rating);
    this.feedback.noofHires = Number(this.feedbackForm.value.noofHires);
    this.feedback.successfullyCompleted = Number(this.feedbackForm.value.successfullyCompleted);
    this.feedback.remarks = this.feedbackForm.value.remarks;

    this.feedbackService.createRequisitionFeedback(this.feedback)
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
