import { Component, OnInit } from '@angular/core';
import { RequisitionJPMPendingFilter } from 'src/app/_models/requisition/requisitionJPMPendingFilter';
import { CommonService } from 'src/app/_services/common/common.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { RequisitionService } from 'src/app/_services/requisition/requisition.service';
import { JobTitleJPMDefaultFilter } from 'src/app/_models/requisition/jobTitleJPMDefaultFilter';
import { LIST_TYPES } from 'src/app';
import { AddJobTitleComponent } from './settings-job-title-details/add-job-title/add-job-title.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'settings-job-titles',
  templateUrl: './settings-job-titles.component.html',
  styleUrls: ['./settings-job-titles.component.css'],
})
export class SettingsJobTitlesComponent implements OnInit {
  jobtitles: any[] = [];
  ref!: DynamicDialogRef;
  totalRecords: number = 0;
  searchFilter: string = '';
  statusLiid: number = 0;
  loading: boolean = false;
  jpmStatus: number = 0;
  jpmStatuses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private requisitionService: RequisitionService,
    private readonly commonService: CommonService,
    private readonly authenticationService: AuthenticationService,
    private dialogService: DialogService) { }

  ngOnInit() {
    //this.getJPMStatuses();
    this.getOneWayInterviewTemplates();
  }
  getOneWayInterviewTemplates() {
    this.commonService.getOneWayInterviewTemplates().subscribe((res: any) => {
      if (res?.success) {
        this.jpmStatuses = res?.data;
      }
    });
  }
  getJPMStatuses() {
    this.commonService.getListItems(LIST_TYPES.JPM_REQUISITION_STATUS).subscribe((res: any) => {
      if (res?.success) {
        this.jpmStatuses = res?.data;
      }
    });
  }

  getJobTitles(params: JobTitleJPMDefaultFilter) {
    this.loading = true;
    params.listType = 'Empty';
    params.filter1 = this.jpmStatus;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.requisitionService.getJobTitlesJPMDefault(params).subscribe((res) => {
      if (res?.success) {
        this.jobtitles = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;

        this.jobtitles.forEach(item => {
          var strHTML = "";
          var strHTMLPre = "";
          var strTemplate = "<span class='badge rounded-pill bg-label-secondary'>[VALUE]</span> ";
          var strHTMLPost = "";
          var arrScreeningCategories = item.screeningCategories.split('|');

          for (var i = 0; i < arrScreeningCategories.length; i++) {
            strHTML += strTemplate
            .replace(/\[VALUE\]/g, arrScreeningCategories[i]);
          }
          item.screeningCategoriesHTML = strHTMLPre + strHTML + strHTMLPost;
        });


      }
    });
  }
  addJobTitleCategories(){

  }
  openSaveJTModal(){
    this.ref = this.dialogService.open(AddJobTitleComponent, {
      header: 'Add Job Title',
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getJobTitles({});
      }
    })
  }
}
