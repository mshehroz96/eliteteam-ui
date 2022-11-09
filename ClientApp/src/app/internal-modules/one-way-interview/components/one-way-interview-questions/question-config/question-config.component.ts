import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { OneWayInterviewQuestion } from 'src/app/_models/one-way-interview/one-way-interview-question';
import { CommonService } from 'src/app/_services/common/common.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-config',
  templateUrl: './question-config.component.html',
  styleUrls: ['./question-config.component.css']
})
export class QuestionConfigComponent implements OnInit {

  question: OneWayInterviewQuestion;
  submitted: boolean = false;
  templates: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private oneWayInterviewService: OneWayInterviewService,
    private commonService: CommonService) {
    this.question = new OneWayInterviewQuestion();
  }

  ngOnInit(): void {

    this.question.oneWayInterviewQuestionId = Number(this.config.data.id);

    if (this.question.oneWayInterviewQuestionId > 0) {
      this.oneWayInterviewService.getInterviewQuestion(this.question.oneWayInterviewQuestionId).subscribe((res) => {
        if (res?.success) {
          this.question = res.data;
        }

      });
    }
  }

  closeModal(): void {
    this.ref.close(this.question);
  }


  saveConfig(applyAll:boolean) {

    this.submitted = true;
    this.question.applyAll=applyAll;

    if(applyAll==true)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to apply this question settings to all question in the template!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, apply it!',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateConfiguration();
        }
      });
    }
    else
    {
      this.updateConfiguration();
    }

  }

  private updateConfiguration()
  {
    this.oneWayInterviewService.updateInterviewQuestionSetting(this.question)
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
