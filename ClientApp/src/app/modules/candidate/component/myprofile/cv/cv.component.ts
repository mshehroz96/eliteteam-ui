import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { LIST_TYPES } from 'src/app';
import { ICandidateCVProfile, ICandidateCVProfileLanguages, ICandidateCVProfileSkills } from 'src/app/_models/candidate/ICandidateCVProfile';
import { AuthenticationService, CommonService } from 'src/app/_services';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';
import Swal from 'sweetalert2';
import { AddUpdateAwardsComponent } from './add-update-awards/add-update-awards.component';
import { AddUpdateCertificationsComponent } from './add-update-certifications/add-update-certifications.component';
import { AddUpdateEducationComponent } from './add-update-education/add-update-education.component';
import { AddUpdatePersonalDetailsComponent } from './add-update-personal-details/add-update-personal-details.component';
import { AddUpdatePublicationsComponent } from './add-update-publications/add-update-publications.component';
import { AddUpdateReferencesComponent } from './add-update-references/add-update-references.component';
import { AddUpdateWrkExpComponent } from './add-update-wrk-exp/add-update-wrk-exp.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  obj:ICandidateCVProfile;
  languages: any[] = [];
  skills: any[] = [];
  selectedSkills?:number[] = [];
  selectedLanguages?:number[] = [];
  ref!: DynamicDialogRef;

  constructor( private dialogService: DialogService,private service: CandidateService,private auth: AuthenticationService,private common: CommonService) {
    this.obj = {
      awards: [],
      languages : [] = [],
      candidateCVID: 0,
      candidateUserID:0,
      educations:[],
      fullName:"",
      publications:[],
      workExperience:[],
    }
  }
  isShareProfile : boolean = false;
  
  ngOnInit(): void {
    this.getCandidateCVDetailsById();
    this.getSkills();
    this.getLanguages();
    
  }
  getLanguages(){
    this.common.getListItems(LIST_TYPES.LANGUAGES).subscribe((res: any) => {
      if (res?.success) {
        this.languages = res.data;
        //this.user.language =  [145];
      }
    });
  }
  getSkills(){
    this.common.getListItems(LIST_TYPES.SKILLS).subscribe((res: any) => {
      if (res?.success) {
        this.skills = res.data;
        //this.user.language =  [145];
      }
    });
  }
  getCandidateCVDetailsById(){
    this.service.getCandidateCVDetailsById(this.auth.currentUserValue.userId).subscribe((res: any) => {
      if (res?.success) {
        this.obj = res?.data;
        if(this.obj.skills){
          this.selectedSkills = this.obj.skills?.map(function(v){
              return Number(v.listItemID);
          });
        }
        if(this.obj.languages){
          this.selectedLanguages = this.obj.languages?.map(function(v){
              return Number(v?.listItemID);
          });
        }
      }
    });
  }
  shareProfile(){
    this.isShareProfile = true;
  }
  open() {
    this.ref = this.dialogService.open(AddUpdatePersonalDetailsComponent, {
      header: 'Add/Update Personal Details',
      data: {
        obj: this.obj
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  openwe() {
    this.ref = this.dialogService.open(AddUpdateWrkExpComponent, {
      header: 'Add Work Experience',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editwe(item:any) {
    this.ref = this.dialogService.open(AddUpdateWrkExpComponent, {
      header: 'Edit Work Experience',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deletewe(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteWorkExp(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
  openedu() {
    this.ref = this.dialogService.open(AddUpdateEducationComponent, {
      header: 'Add Education',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editedu(item:any) {
    this.ref = this.dialogService.open(AddUpdateEducationComponent, {
      header: 'Edit Education',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deleteedu(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteEducation(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
  updateSkills() {
    let arr : ICandidateCVProfileSkills[] = [];
    if(this.selectedSkills){
      for (let index = 0; index < this.selectedSkills.length; index++) {
        const element = this.selectedSkills[index];
        let ii: ICandidateCVProfileSkills = {
          listItemID : element,
          candidateCVID:this.obj.candidateCVID
        };
        arr.push(ii);
      }
    }
    this.service.updateCandidateCVProfileSkills(arr).subscribe((res: any) => {
      if (res?.success) {
        this.obj = res?.data;
        this.getCandidateCVDetailsById();
      }
    });
  }
  updateLanguages() {
    let arr : ICandidateCVProfileLanguages[] = [];
    if(this.selectedLanguages){
      for (let index = 0; index < this.selectedLanguages.length; index++) {
        const element = this.selectedLanguages[index];
        let ii: ICandidateCVProfileLanguages = {
          listItemID : element,
          candidateCVID:this.obj.candidateCVID
        };
        arr.push(ii);
      }
    }
    this.service.updateCandidateCVProfileLanguages(arr).subscribe((res: any) => {
      if (res?.success) {
        this.obj = res?.data;
        this.getCandidateCVDetailsById();
      }
    });
  }
  opencer() {
    this.ref = this.dialogService.open(AddUpdateCertificationsComponent, {
      header: 'Add Certifications / Licenses',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editcer(item:any) {
    this.ref = this.dialogService.open(AddUpdateCertificationsComponent, {
      header: 'Edit Certifications / Licenses',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deletecer(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCertification(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
  openawa() {
    this.ref = this.dialogService.open(AddUpdateAwardsComponent, {
      header: 'Add  Awards / Recognitions',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editawa(item:any) {
    this.ref = this.dialogService.open(AddUpdateAwardsComponent, {
      header: 'Edit  Awards / Recognitions',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deleteawa(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAward(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
  openpub() {
    this.ref = this.dialogService.open(AddUpdatePublicationsComponent, {
      header: 'Add Publications',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editpub(item:any) {
    this.ref = this.dialogService.open(AddUpdatePublicationsComponent, {
      header: 'Edit Publications',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deletepub(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePublication(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
  openref() {
    this.ref = this.dialogService.open(AddUpdateReferencesComponent, {
      header: 'Add References',
      data:{
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  editref(item:any) {
    this.ref = this.dialogService.open(AddUpdateReferencesComponent, {
      header: 'Edit References',
      data:{
        obj:item,
        candidateCVID:this.obj.candidateCVID
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res: any) => {
      this.getCandidateCVDetailsById();
    });
  }
  deleteref(item:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this item!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteReferences(item).subscribe((res: any) => {
          if (res?.success) {
            Swal.fire({
              title: 'Are you sure?',
              text: 'Item Deleted Successfully!',
              icon: 'success',
            })
            this.getCandidateCVDetailsById();
          }
        });
      }
    });
    
  }
}
