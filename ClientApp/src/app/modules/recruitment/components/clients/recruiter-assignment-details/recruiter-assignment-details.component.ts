import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRequisition, IRecruitersAssignment, RequisitionRecruiter } from 'src/app/_models/client/IRecruitersAssignment';

import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recruiter-assignment-details',
  templateUrl: './recruiter-assignment-details.component.html',
  styleUrls: ['./recruiter-assignment-details.component.css']
})
export class RecruiterAssignmentDetailsComponent implements OnInit {
  first = 0;
  rows = 10;
  loading: boolean = false;
  recruiters: RequisitionRecruiter[]=[];
  selectedCity: any;
  cities: any;
  recruitersAssignment!:IRecruitersAssignment;
  requisitions?:ClientRequisition[]=[];
  selectedValues: any[] = [];
  selectedEdit: any[] = [];
  recruiter?:IRecruitersAssignment;
  recList?:any[] = [];
  totalRecords:number=0;
  companyId:number = 0;
  noRecord:boolean = false;
  constructor(private clientService: ClientService, private route: ActivatedRoute) {
    this.recruitersAssignment = {
      requisitions: []
    };
    this.getClientRecruiter();
   }

  ngOnInit(): void {

    
    this.getJobDetails({});

    
    this.companyId =
      this.route.snapshot.paramMap.get('id') == null
        ? 0
        : Number(this.route.snapshot.paramMap.get('id'));
  }
  
  getJobDetails(event:any){
    
    this.loading=true;
    this.clientService.getClientRMRecruiterAssignment(this.route.snapshot.params.id).subscribe((res)=>{
      this.recruitersAssignment=res?.data;
      if(!res?.data.requisitions[0].title){
        this.noRecord = true;
      }
      this.loading=false;
    });
  }
  getClientRecruiter() {
    this.clientService.getClientRecruiter(this.route.snapshot.params.id).subscribe((res: any) => {
      if (res && res?.data?.data) {
        this.recruiters = res?.data?.data;
      }
    })
  }

  setRecruiters(event: any, requisition: ClientRequisition)
  {
    this.recruitersAssignment.requisitions.map((x) =>

      {
        if (x.requisitionId == requisition.requisitionId) {
            x.selected=true;
        }

        return x;
      }
        
    );
    
  }

  copyValue(value: any) {
    navigator.clipboard.writeText(value.recruiter);
  }

  saveReq(assignment: IRecruitersAssignment){
    
    this.loading = true;
    assignment.companyId = this.companyId;
    if(assignment.requisitions){
      assignment.requisitions = assignment.requisitions.filter(x=>x.selected);
    }
    this.clientService.saveRecruitersAssignment(assignment).subscribe((res) => {
      this.loading=false;
			if(res?.success)
      {
        Swal.fire({
          title: 'Success',
          text: 'Recruiters assignment has been saved',
          icon: 'success',
        });

        this.getClientRecruiter();
        this.getJobDetails({});
      }
      else
      {
        Swal.fire({
          title: 'error',
          text: res.message,
          icon: 'error',
        });
        
      }
		});
  }
  copyPrimaryRecruiters(){
    if(!this.recruitersAssignment.primaryRecruiterId){
      return;
    }
    var rec = this.recruiters.filter(x=>x.recruiterId == this.recruitersAssignment.primaryRecruiterId)[0];
    if(this.recruitersAssignment.requisitions && this.recruitersAssignment.requisitions.length > 0)
    {
      this.recruitersAssignment.requisitions.forEach((element) =>{
        let RequisitionRecruiterArray: RequisitionRecruiter[] = [];
        let obj : RequisitionRecruiter = {
          recruiter:rec.recruiter,
          recruiterId:rec.recruiterId
        }
        RequisitionRecruiterArray.push(obj);
        if(element.recruiters){
          element.recruiters?.forEach((recur) =>{
            let obj : RequisitionRecruiter = {
              recruiter:recur.recruiter,
              recruiterId:recur.recruiterId
            }
            if(rec.recruiterId !== recur.recruiterId){
              RequisitionRecruiterArray.push(obj);
            }
          });
        }
        element.recruiters = RequisitionRecruiterArray;
      })
    }
    this.recruitersAssignment.requisitions.map((x) =>
    {
      x.selected=true;
    });
  }
  copySecondaryRecruiters(){
    if(!this.recruitersAssignment.secondaryRecruiterId){
      return;
    }
    var rec = this.recruiters.filter(x=>x.recruiterId == this.recruitersAssignment.secondaryRecruiterId)[0];
    if(this.recruitersAssignment.requisitions && this.recruitersAssignment.requisitions.length > 0)
    {
      this.recruitersAssignment.requisitions.forEach((element) =>{
        let RequisitionRecruiterArray: RequisitionRecruiter[] = [];
        let obj : RequisitionRecruiter = {
          recruiter:rec.recruiter,
          recruiterId:rec.recruiterId
        }
        RequisitionRecruiterArray.push(obj);
        if(element.recruiters){
          element.recruiters?.forEach((recur) =>{
            let obj : RequisitionRecruiter = {
              recruiter:recur.recruiter,
              recruiterId:recur.recruiterId
            }
            if(rec.recruiterId !== recur.recruiterId){
              RequisitionRecruiterArray.push(obj);
            }
          });
        }
        element.recruiters = RequisitionRecruiterArray;
      })
    }
    this.recruitersAssignment.requisitions.map((x) =>
    {
      x.selected=true;
    });
  }
}
