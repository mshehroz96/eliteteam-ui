import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientRequisition, IRecruitersAssignment, RequisitionRecruiter } from 'src/app/_models/client/IRecruitersAssignment';
import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-re-assign-requisition-recruiters-jobs',
  templateUrl: './re-assign-requisition-recruiters-jobs.component.html',
  styleUrls: ['./re-assign-requisition-recruiters-jobs.component.css']
})
export class ReAssignRequisitionRecruitersJobsComponent implements OnInit {

  first = 0;
  rows = 10;
  loading: boolean = false;
  recruiters: RequisitionRecruiter[]=[];
  selectedCity: any;
  cities: any;
  // recruitersAssignment!:IRecruitersAssignment;
  requisitions:ClientRequisition[]=[];
  selectedValues: any[] = [];
  selectedEdit: any[] = [];
  recruiter?:IRecruitersAssignment;
  recList?:any[] = [];
  totalRecords:number=0;
  companyId:number = 0;
  id:number = 0;
  currentURL:string;
  constructor(private clientService: ClientService, private route: ActivatedRoute) {
    this.requisitions = [];
    // this.recruitersAssignment = {
    //   requisitions: []
    // };
    this.getClientRecruiter();
    this.currentURL = window.location.href; 
   }

  ngOnInit(): void {
    this.id = Number(this.currentURL.split('/')[this.currentURL.split('/').length - 1])
    this.getJobDetails({});
    this.companyId =
      this.route.snapshot.paramMap.get('id') == null
        ? 0
        : Number(this.route.snapshot.paramMap.get('id'));
  }
  
  getJobDetails(event:any){
    
    this.loading=true;
    this.clientService.getRecruiterRMRecruiterAssignment(this.id).subscribe((res)=>{
      this.requisitions=res?.data;
      this.loading=false;
    });
  }
  getClientRecruiter() {
    this.clientService.getClientRecruiter(0).subscribe((res: any) => {
      if (res && res?.data?.data) {
        this.recruiters = res?.data?.data;
      }
    })
  }

  setRecruiters(event: any, requisition: ClientRequisition)
  {
    this.requisitions.map((x) =>

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

  saveReq(requisitions: ClientRequisition[]){
    
    this.loading = true;

    requisitions = requisitions.filter(x=>x.selected);

    this.clientService.saveRecruitersAssignmentJobs(requisitions).subscribe((res) => {
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

}
