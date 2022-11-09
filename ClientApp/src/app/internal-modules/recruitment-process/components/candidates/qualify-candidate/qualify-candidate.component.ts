import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RedactDetail } from 'src/app/_models/recruitment/requisition-candidate';
import { RequisitionApplicantStatus } from 'src/app/_models/recruitment/requisition-candidate-filter';
import { RecruitmentService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qualify-candidate',
  templateUrl: './qualify-candidate.component.html',
  styleUrls: ['./qualify-candidate.component.css']
})
export class QualifyCandidateComponent implements OnInit {

  applicantId:number=0;
  redact!:RedactDetail;
  
  constructor(private ref: DynamicDialogRef,
    private recruitmentService: RecruitmentService,
    public config: DynamicDialogConfig,) { 
      this.redact=new RedactDetail();
      this.applicantId = Number(this.config.data.id);
    }

  ngOnInit() {
    
  }

  closeModel() {
    if (this.ref) {
      this.ref.close();
    }
  }

  redactChanged(event: RedactDetail)
  {
    console.log(event);
    
    this.redact=event;
  }

  qualify(){
    this.recruitmentService.qualifyApplicant(this.applicantId,this.redact).subscribe((x) => {
      this.candidateQualified();
    });
  }

  candidateQualified() {
    Swal.fire({
      title: 'Candidate Qualified',
      text: 'The candidate was qualified successfully.',
      icon: 'success',

    });
    this.ref.close({});
  }

}
