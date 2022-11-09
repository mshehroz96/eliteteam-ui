import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComboBox } from 'src/app/_models/common/common';
import { CommonService, JobTitleService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-job-title',
  templateUrl: './add-job-title.component.html',
  styleUrls: ['./add-job-title.component.css']
})
export class AddJobTitleComponent implements OnInit {

  jobTitle:any = {};
  JobTitleId:number = 0;
  constructor(
    private commonService: CommonService,
    public config: DynamicDialogConfig,
    private readonly jobTitleService: JobTitleService,
    private ref: DynamicDialogRef) {
      this.jobTitle = {
        title:"",
        domainLIID:'-- Select --',
        jobDescription:""
      };
     }

    domains: Array<ComboBox> = [];
  ngOnInit() {
    this.getAllDomains();
  }
  getAllDomains() {
    this.commonService.getJobTitleDomains().subscribe((res: any) => {
      if (res?.success) {
        this.domains = res?.data;
      }
    });

  }
  closeModal(): void {
    this.ref.close(this.JobTitleId);
  }
  saveJobTitle(){
    
    this.jobTitleService.saveJobTitle(this.jobTitle).subscribe((res: any) => {
      if (res?.success) {
        Swal.fire({
          title: 'Success',
          text: 'One way interview template has been updated successfully.',
          icon: 'success',
        }).then((result) => {
          this.closeModal();
        });
      }
    });
  }
}
