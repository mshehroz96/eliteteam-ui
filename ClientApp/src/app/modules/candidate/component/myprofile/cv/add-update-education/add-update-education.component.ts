import { Component, OnInit } from '@angular/core';
import { ICandidateCVEducation } from 'src/app/_models/candidate/ICandidateCVProfile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ICandidateCVWorkExperience } from 'src/app/_models/candidate/ICandidateCVProfile';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-education',
  templateUrl: './add-update-education.component.html',
  styleUrls: ['./add-update-education.component.css']
})
export class AddUpdateEducationComponent implements OnInit {
  obj:ICandidateCVEducation;
  UserForm = new FormGroup({
    degree: new FormControl('', Validators.required),
    school: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  });
  constructor(
    public loadingService: LoadingService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: CandidateService) {
		this.obj = {
		  degree:"",
		  school:"",
		  location:"",
		  fromDate:"",
		  toDate:""
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
      this.obj.candidateCVID = this.config.data.candidateCVID;
      this.loadingService.doLoading(
        this.service.addUpdateEducation(this.obj), this).pipe(first())
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
