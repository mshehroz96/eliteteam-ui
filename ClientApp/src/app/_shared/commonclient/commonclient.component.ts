import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILES_PATHS } from 'src/app';
import { ComboBox } from 'src/app/_models/common/common';
import { AuthenticationService, CommonService, UserService } from 'src/app/_services';
import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commonclient',
  templateUrl: './commonclient.component.html',
  styleUrls: ['./commonclient.component.css']
})
export class CommonclientComponent implements OnInit {

  @Input() companyId: number = 0;
  company:any;
  strFileURL?:string = "";
  plans:ComboBox[] = [];
  selectedPlan:number;
  userType:number;
  
  constructor(
    private clientService:ClientService , 
    private route:ActivatedRoute,
    private common:CommonService,
    private userService: UserService,
    private auth: AuthenticationService) {
    this.selectedPlan = 0;
    this.userType = 0;
  }
  ngOnInit(): void {
    this.userType = this.auth.currentUserValue.userType ;
    this.getData();
    this.getAllPlans();
   
  }
  getAllPlans() {
    this.common.getAllPlans().subscribe((res: any) => {
      if (res && res?.data) {
        this.plans = res?.data;
      }
    })
  }
  getData() {
    this.clientService.getCompanyDetailById(this.companyId).subscribe((res: any) => {
      if (res && res?.data) {
        this.company = res?.data;
        if(this.company.planTypeValue){
          this.company.planTypeValue = Number(this.company.planTypeValue);
        }
        this.strFileURL = FILES_PATHS.MAP_COMPANY_LOGO(this.company.logoFileName);
      }
    })
  }
  // getData() {
  //   if (this.clientService.selected == 'Unassigned Clients') {
  //     this.clientService.getGetClientsRMUnassignedById(this.companyId).subscribe((res: any) => {
  //       if (res && res?.data) {
  //         this.clientUnassignedData = res?.data;
  //         if(this.clientUnassignedData.planTypeValue){
  //           this.clientUnassignedData.planTypeValue = Number(this.clientUnassignedData.planTypeValue);
  //         }
  //         this.strFileURL = FILES_PATHS.MAP_COMPANY_LOGO(this.clientUnassignedData.logoFileName);
  //       }
  //     })
  //   } else {
  //     this.clientService.getGetClientsRMAssignedById(this.companyId).subscribe((res: any) => {
  //       if (res && res?.data) {
  //         this.clientUnassignedData = res?.data;
  //         if(this.clientUnassignedData.planTypeValue){
  //           this.clientUnassignedData.planTypeValue = Number(this.clientUnassignedData.planTypeValue);
  //         }
  //         this.strFileURL = FILES_PATHS.MAP_COMPANY_LOGO(this.clientUnassignedData.logoFileName);
  //       }
  //     })
  //   }
  // }
  onchange(event:any){
    let obj :any = {
      planId:event.value,
      companyId:this.companyId
    }
    this.clientService.changeCompanyPlan(obj).subscribe((res: any) => {
      if (res?.success) {
        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: res.message,
            icon: 'success',
          }).then((result) => {
             var plan =  this.plans.filter((item) => item.value == event.value)[0];
             this.auth.currentUserValue.planType = plan.displayText;
             this.getData();
          });

        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          }).then((result) => {

          });
        }
      }
    })
  }
  getCurrentUserDetailByEmail(){
    this.userService.getCurrentUserDetailByEmail(this.auth.currentUserValue.email)
      .subscribe((res: any) => {
        if(res?.success){
          window.localStorage.setItem('currentUser', JSON.stringify(res.data));
          this.auth.currentUserSubject.next(res.data);
          this.auth.currentUser.next(res.data);
        }
      });
  }
  
}
