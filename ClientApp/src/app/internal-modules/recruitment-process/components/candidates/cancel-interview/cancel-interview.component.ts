import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { RecruitmentService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancel-interview',
  templateUrl: './cancel-interview.component.html',
  styleUrls: ['./cancel-interview.component.css']
})


export class CancelInterviewComponent implements OnInit {

  applicantId: number = 0;
  reason:string='';
  constructor(public loadingService: LoadingService,
    private recruitmentService: RecruitmentService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig) 
 { }

  ngOnInit() {

    this.applicantId = Number(this.config.data.id);

  }

  cancelInterView() {
    this.loadingService.doLoading(
      this.recruitmentService.cancelApplicantInterview({ "applicantId": this.applicantId, "reason":this.reason}), this
    ).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Cancelled Interview',
          text: 'The interview has been cancelled.',
          icon: 'success',
        });

        this.ref.close({});
      }
    });
  }
  closeModel() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
