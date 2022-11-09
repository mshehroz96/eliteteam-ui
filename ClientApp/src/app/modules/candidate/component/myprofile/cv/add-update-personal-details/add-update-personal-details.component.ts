import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-update-personal-details',
  templateUrl: './add-update-personal-details.component.html',
  styleUrls: ['./add-update-personal-details.component.css']
})
export class AddUpdatePersonalDetailsComponent implements OnInit {
  
  obj:any;
  gendersList:any[] = [];
  UserForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required)
  });
  constructor(
    public loadingService: LoadingService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public service: CandidateService) { }

  ngOnInit() {
    if(this.config.data.obj){
      this.obj = this.config.data.obj;
      this.obj.birthDate = moment(this.obj.birthDate).format('MM/DD/YYYY')
    }
    this.gendersList = [
      {
        name:"Male",
        value:"M"
      },
      {
        name:"Female",
        value:"F"
      }
    ]
  }
  Cancel() {
    this.closeModal();
  }
  closeModal(): void {
    this.ref.close(this.obj);
  }
  saveData() {
    if (this.UserForm.valid) {
      this.obj.birthDate = new Date(moment(this.obj.birthDate).format('yyyy-MM-DD') + ' ' + moment.utc(this.obj.birthDate).local().format("h:mm A"));
      this.obj.workExperience = [];
      this.obj.educations = [];
      this.obj.awards = []; 
      this.obj.publications = [];
      this.loadingService.doLoading(
        this.service.saveUpdateCandidateCVInformation(this.obj), this).pipe(first())
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
