import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ICandidateCVWorkExperience } from 'src/app/_models/candidate/ICandidateCVProfile';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-wrk-exp',
  templateUrl: './add-update-wrk-exp.component.html',
  styleUrls: ['./add-update-wrk-exp.component.css']
})
export class AddUpdateWrkExpComponent implements OnInit {
  obj:ICandidateCVWorkExperience;
  UserForm = new FormGroup({
    jobTitle: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    description: new FormControl('')
  });
  constructor(
    public loadingService: LoadingService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: CandidateService) {
		this.obj = {
		  jobTitle:"",
		  company:"",
		  location:"",
		  fromDate:"",
		  toDate:"",
		  description:""
		}
	}

  ngOnInit() {
    if(this.config.data.obj){
      this.obj = this.config.data.obj;
      // this.obj.fromDate = moment(this.obj.fromDate).format('MM/DD/YYYY')
      // this.obj.toDate = moment(this.obj.toDate).format('MM/DD/YYYY')
    }
  }
  Cancel() {
    this.closeModal();
  }
  closeModal(): void {
    this.ref.close(this.obj);
  }
  saveData() {
    if (this.UserForm.valid) {
      console.log(this.obj);
      this.obj.candidateCVID = this.config.data.candidateCVID;
      // this.obj.fromDate = new Date(moment(this.obj.fromDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.obj.fromDate).local().format("h:mm A"));
      // this.obj.toDate = new Date(moment(this.obj.toDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.obj.toDate).local().format("h:mm A"));
      this.loadingService.doLoading(
        this.service.addUpdateWorkExp(this.obj), this).pipe(first())
        .subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Success',
              text:  res.message,
              icon: 'success',
            });
            this.ref.close({});
          } else {
            Swal.fire({
              title: 'Error',
              text: res.message,
              icon: 'error',
            });
            this.ref.close({});
          }
        });      
    }
  }
}
