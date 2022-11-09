import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RequisitionRequest } from 'src/app/_models/requisition/requisition-request';
import { RequisitionRequestService } from 'src/app/_services/requisition/requisition-request/requisition-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {

  attachmentUrl:string='';
  requisitionRequest: RequisitionRequest;
  constructor(
    public loadingService: LoadingService,
    private router:Router,
    private requisitionRequestService: RequisitionRequestService
  ) {
    this.requisitionRequest = this.requisitionRequestService.requisitionRequest;

  }
  
  ngOnInit(): void {

  }
  editDetails(stepIndex: number) {
    this.requisitionRequestService.activeStepIndex.next(stepIndex);
  }
  finish() {

    this.requisitionRequest.isDraft = false;

    this.loadingService.doLoading(
      this.requisitionRequestService.createOrUpdateRequisition(this.requisitionRequest), this
    )
    .subscribe((res: any) => {
        if (res?.success) {

          Swal.fire({
            title: 'Job Submitted',
            text: "Your job has been submitted successfully. Our recruiters will now start working on this request. ",
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/client/jobs']);
          });


        }
    });
  }
  prevPage() {
    this.requisitionRequestService.activeStepIndex.next(3);
  }

}
