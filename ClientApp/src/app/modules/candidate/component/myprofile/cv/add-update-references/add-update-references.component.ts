import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ICandidateCVProfileCertifications, ICandidateCVProfilePublication, ICandidateCVProfileReferences, ICandidateCVWorkExperience } from 'src/app/_models/candidate/ICandidateCVProfile';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-update-references',
  templateUrl: './add-update-references.component.html',
  styleUrls: ['./add-update-references.component.css']
})
export class AddUpdateReferencesComponent implements OnInit {
  obj:ICandidateCVProfileReferences;
  UserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    jobTitle: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required)
  });
  constructor(
    public loadingService: LoadingService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: CandidateService) {
		this.obj = {
		  name:"",
		  jobTitle:"",
		  company:"",
      email:"",
      phone:""
		}
	}

  ngOnInit() {
    if(this.config.data.obj){
      this.obj = this.config.data.obj;
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
      this.loadingService.doLoading(
        this.service.addUpdateReferences(this.obj), this).pipe(first())
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
