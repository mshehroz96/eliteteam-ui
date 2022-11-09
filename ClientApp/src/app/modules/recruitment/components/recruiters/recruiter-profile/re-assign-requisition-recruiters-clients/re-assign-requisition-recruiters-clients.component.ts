import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FILES_PATHS } from 'src/app';
import { RequisitionRecruiter } from 'src/app/_models/client/IRecruitersAssignment';
import { IRecruiterClientAssignment } from 'src/app/_models/recutiter/IRecruiterClientAssignment';
import { CommonService, RecruiterService } from 'src/app/_services';
import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-re-assign-requisition-recruiters-clients',
  templateUrl: './re-assign-requisition-recruiters-clients.component.html',
  styleUrls: ['./re-assign-requisition-recruiters-clients.component.css']
})
export class ReAssignRequisitionRecruitersClientsComponent implements OnInit {

  currentURL:string;
  constructor(
    private service: RecruiterService,
    private commonService:CommonService,
    private route: ActivatedRoute,
    private ref: DynamicDialogRef
  ) { 
    this.currentURL = window.location.href; 
  }
  recruiters: RequisitionRecruiter[]=[];
  companies:any[] = [];
  id?:number;
  assignments:IRecruiterClientAssignment[] = [];
  noRecord:boolean= false;
  ngOnInit() {
    this.id = Number(this.currentURL.split('/')[this.currentURL.split('/').length - 1])
    this.getClientRecruiter();
    this.getRecruiterCompanies();
  }
  getClientRecruiter() {
    this.commonService.getUsersByType(3).subscribe((res: any) => {
      if (res && res?.data) {
        this.recruiters = res?.data;
      }
    })
  }
  getRecruiterCompanies() {
    this.service.getRecruiterCompanies(this.id).subscribe((res: any) => {
      if (res && res?.data) {
        this.companies = res?.data;
        this.companies.forEach((user) => {
          user.logoFileName = FILES_PATHS.MAP_COMPANY_LOGO(user.logoFileName)
        });
        if(this.companies.length == 0){
          this.noRecord = true;
        }
      }
    })
  }
  onchange(event:any,companyId:number){
    var exsist = this.assignments?.find(e => e.companyId === companyId);
    if(exsist){
      this.assignments?.splice(this.assignments?.findIndex(item => item.companyId === companyId),1);
    }
    let obj: IRecruiterClientAssignment = {
      companyId:companyId,
      newRecruiterId:event.value.recruiterId,
      oldRecruiterId:this.id
    }
    this.assignments?.push(obj);
  }
  SaveReassignment(){
    if(this.assignments.length > 0){
      this.service.SaveReassignment(this.assignments).subscribe((res) => {
        if (res?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Reassignment Done Successfully!',
          });
          this.closeModal();
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
        this.getClientRecruiter();
        this.getRecruiterCompanies();
      });
    }
  }
  closeModal(): void {
    this.ref.close();
  }
}
