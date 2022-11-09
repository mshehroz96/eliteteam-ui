import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ICandidateCVProfileCertifications, ICandidateCVProfilePublication, ICandidateCVWorkExperience } from 'src/app/_models/candidate/ICandidateCVProfile';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-publications',
  templateUrl: './add-update-publications.component.html',
  styleUrls: ['./add-update-publications.component.css']
})
export class AddUpdatePublicationsComponent implements OnInit {
  obj:ICandidateCVProfilePublication;
  UserForm = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    datePublished: new FormControl('', Validators.required)
  });
  constructor(
    public loadingService: LoadingService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: CandidateService) {
		this.obj = {
		  title:"",
		  url:"",
		  datePublished:""
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
        this.service.addUpdatePublications(this.obj), this).pipe(first())
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
