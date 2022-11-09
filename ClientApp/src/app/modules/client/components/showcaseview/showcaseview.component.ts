import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientShowCaseFilter } from 'src/app/_models/client/clientshowcasefilter';
import { AddJobCandidateDto, ShareCandidateToClientDto } from 'src/app/_models/showcase/showcase';
import { ShowcaseService } from 'src/app/_services/showcase/showcase.service';
import { CommonService } from 'src/app/_services/common/common.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-showcaseview',
  templateUrl: './showcaseview.component.html',
  styleUrls: ['./showcaseview.component.css']
})
export class ShowcaseviewComponent implements OnInit {
  display: boolean = false;
  showCaseUUID: string = '';
  totalRecords: number = 0;
  blocked: boolean = false;
  candidateList: any[] = [];
  candidateJobs: any[] = [];
  showcaseTitle: any = "";
  first: number = 1;
  rows: number = 10;
  selectedClientUser: any = [];
  allClientUsers: any[] = [];
  addJobCandidate: AddJobCandidateDto = {
    candidates: [],
    requisitionID: 0
  };

  shareCandidates: ShareCandidateToClientDto = {
    candidates: [],
    clients: [],
    message: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private showcaseService: ShowcaseService,
    private commonService : CommonService
  ) { }

  ngOnInit(): void {
    this.showCaseUUID = this.activatedRoute.snapshot.params['id'];
    this.getShowCaseCandidates({});
  }

  getShowCaseCandidates(params: ClientShowCaseFilter) {
    this.blocked = true;
    params.showCaseUUID = this.showCaseUUID;
    params.sqlCondition = "";
    params.sqlCondition = "";
    params.userId = 0;
    this.showcaseService.getCandidateShowCaseDetail(params).subscribe((res) => {
      console.log(res.success);

      if (res.success) {
        this.candidateList = res.data;
        this.showcaseTitle = this.candidateList[0].showCaseTitle;
        this.totalRecords = res.totalRecords;
        this.candidateJobs = res.candidateJobs;
        this.blocked = false;
        console.log(this.candidateList);
      }
    });
  }

  paginate(event: any) {

    this.first = event.page + 1;
    this.getShowCaseCandidates({});
  }

  hideDialog() {
    this.display = false;
  }

  showDialog() {
    var i = 0;
    for (let index = 0; index < this.candidateList.length; index++) {
      if(this.candidateList[index].isSelected){
        i++;
      }
    }

    if(i == 0)
    {
      if(this.addJobCandidate.candidates.length ==  0){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Plese select candidate!',
          });
          return;

      }
    }

    this.display = true;
  }

  setCompany(obj: any) {
      var comanyEmail = obj.companyEmail.split('@')[1];
      var userEmail = obj.email.split('@')[1];

      if(comanyEmail != userEmail){
        var obj = this.selectedClientUser.splice(-1);
        Swal.fire({
          icon: 'error',
          title: 'Validation',
          text: 'You can only share with users form your own company.',
        });

      }

  }

  getSelectedClient() : any{
    var i = 0;
    for (let index = 0; index < this.candidateList.length; index++) {
      const element = this.candidateList[index];

      if (element.isSelected) {
        i ++;
      }
    }

    return i;
  }

  public findCandidates(candidate: any[]): any[] {
    return candidate.filter(p => p.isSelected == true);
  }

  searchClientUsers(event: any) {
    this.commonService.searchClientUsers({ query: event.query  }).subscribe((res: any) => {
      if (res?.success) {
        this.allClientUsers = res?.data;
      }
    });

  }


  addCandidateJob(item: any) {

    this.addJobCandidate.candidates = [];
    //Push Candidates
    for (let index = 0; index < this.candidateList.length; index++) {
      const element = this.candidateList[index];
      //console.log(element.candidateUserID);
      //console.log(element.showcaseCandidateID);
      if (element.isSelected) {
       // this.addJobCandidate.candidates.push({ candidateUserId: element.candidateUserID });
        this.addJobCandidate.candidates.push({ showcaseCandidateID: element.showcaseCandidateID });
        console.log(element.showcaseCandidateID);
      }
    }

    if (this.addJobCandidate.candidates.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Plese select candidate!',
      });

      return;
    }
    this.addJobCandidate.requisitionID = item.requisitionID;
    this.blocked = true;
    var candidates = '';
    this.showcaseService.addJobCandidates(this.addJobCandidate).subscribe((res) => {
      if (res?.success) {

        if(res?.data.length == 0){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Candidates Added!',
          });
        }
        else{
          for (let index = 0; index < this.candidateList.length; index++) {
            const element = this.candidateList[index];
             if(element.candidateUserID == res?.data[0].candidateUserID) {
               candidates = candidates + element.fullName + ',';
             }
          }

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text:'following ' + candidates + ' candidates are already in the requisition and you cannot add.',
          });
        }
        this.blocked = false;

        for (let index = 0; index < this.candidateList.length; index++) {
          const element = this.candidateList[index];
          element.isSelected = false;
        }
      }
    });


  }

  Send(){

    if(this.selectedClientUser.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Validation',
        text: 'Plese select user!',
      });
      return;
    }

    //Add Clients
    for (let index = 0; index < this.selectedClientUser.length; index++) {
        this.shareCandidates.clients.push({ clientUserId :  this.selectedClientUser[index].userId,
          email : this.selectedClientUser[index].email , showCaseUUID : ''});
    }


    //Add Candidates
    for (let index = 0; index < this.candidateList.length; index++) {
      if(this.candidateList[index].isSelected){
        this.shareCandidates.candidates.push({ candidateUserId :  this.candidateList[index].candidateUserID,
          fullName : this.candidateList[index].fullName});
      }
    }
   this.blocked = true;
    this.showcaseService.shareCandidateToClient(this.shareCandidates).subscribe((res) => {
      if (res?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Candidates Successfully Shared!',
        });

        this.blocked = false;
      }
    });

  }
}
