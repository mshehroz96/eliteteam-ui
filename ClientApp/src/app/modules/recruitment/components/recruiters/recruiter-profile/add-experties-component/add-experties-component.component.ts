import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ComboBox } from 'src/app/_models/common/common';
import { RecruiterExperties } from 'src/app/_models/recutiter/recutiter-filter';
import { CommonService } from 'src/app/_services';
import { RecruiterService } from 'src/app/_services/recruiter/recruiter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-experties-component',
  templateUrl: './add-experties-component.component.html',
  styleUrls: ['./add-experties-component.component.css']
})
export class AddExpertiesComponentComponent implements OnInit {
  experties:ComboBox[] = [];
  selectedArea!:number;
  action:string = "";
  showError:boolean = false;
  enableSave:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private readonly recruiterService: RecruiterService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private common:CommonService,
    public loadingService: LoadingService,
  ) {
    this.experties = [];
   }
  // expeertiesForm = this.fb.group({
	// 	experties: [""],
	// });
  // expertiesAutoComplete: any[] = [];
  // isEdit?:boolean = false;
  ngOnInit() {
    // if(this.config.data.itemId){
    //   // this.expeertiesForm.patchValue({
    //   //   experties: {
    //   //       listID: Number(this.config.data.itemId),
    //   //       title: this.config.data.title
    //   //     }
    //   // });
    //   //this.isEdit = true;
    // }
    if(this.config.data.obj){
      this.selectedArea = Number(this.config.data.obj.areaOfExpertiseLIID);
    }
    this.action = this.config.data.action;
    this.getListItems();
  }
  getListItems(){
    this.common.getListItems(LIST_TYPES.RECRUITER_AREA_OF_EXPERTISE).subscribe((res) => {
      if (res?.success) {
        this.experties = res?.data;
      }
    });
  }
  saveUpdateExperties(){
    if(!this.selectedArea){
      this.showError = true;
      return;
    }
    else{
      this.showError = false;
    }
    let experties : RecruiterExperties = {
      recruiterUserID:Number(this.config.data.obj.recruiterUserID),
      areaOfExpertiseLIID:this.selectedArea,
      recruiterSpecializationID : this.config.data.obj.recruiterSpecializationID ? Number(this.config.data.obj.recruiterSpecializationID) : 0
    }
    this.loadingService.doLoading(
    this.recruiterService.addExperties(experties),this).subscribe((res) => {
      if (res?.success) {
        Swal.fire({
          icon: 'success',
          title: res.message,
          text: 'Experties Saved Successfully!',
        });
        this.closeModal();
      }
      else{
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        })
        this.closeModal();
      }
    });
  }
  // searchExperties(event: any) {
  //   this.recruiterService.searchExperties(event.query).subscribe((res: any) => {
  //     if (res?.success) {
  //       this.expertiesAutoComplete = res?.data;
  //     }
  //   });
  // }
  closeModal(): void {
    this.ref.close();
  }
  onchange(event:any){
    if(event.value){
      this.enableSave = true;
    }
    else{
      this.enableSave = false;
    }
  }
}
