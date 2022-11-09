import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { JobTitleService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-associated-jobs',
  templateUrl: './add-associated-jobs.component.html',
  styleUrls: ['./add-associated-jobs.component.css']
})
export class AddAssociatedJobsComponent implements OnInit {
  files1: TreeNode[];
  selectedFile: TreeNode;
  selectedCategoryId:number = 0;
  JobTitleId:number = 0;
  selectdNodeType: string = "";
  constructor(
    private readonly jobTitleService: JobTitleService,
    private ref: DynamicDialogRef,
    public loadingService: LoadingService,
    public config: DynamicDialogConfig) {
    this.files1 = [];
    this.selectedFile = {};
   }
  ngOnInit() {
    // this.files1 = [
    //   {
    //       "label": "Documents",
    //       "data": "Documents Folder",
    //       "expandedIcon": "pi pi-folder-open",
    //       "collapsedIcon": "pi pi-folder",
    //       "children": [{
    //               "label": "Work",
    //               "data": "Work Folder",
    //               "expandedIcon": "pi pi-folder-open",
    //               "collapsedIcon": "pi pi-folder",
    //               "children": [{"label": "Expenses.doc", "icon": "pi pi-file", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "pi pi-file", "data": "Resume Document"}]
    //           },
    //           {
    //               "label": "Home",
    //               "data": "Home Folder",
    //               "expandedIcon": "pi pi-folder-open",
    //               "collapsedIcon": "pi pi-folder",
    //               "children": [{"label": "Invoices.txt", "icon": "pi pi-file", "data": "Invoices for this month"}]
    //           }]
    //   },
    //   {
    //       "label": "Pictures",
    //       "data": "Pictures Folder",
    //       "expandedIcon": "pi pi-folder-open",
    //       "collapsedIcon": "pi pi-folder",
    //       "children": [
    //           {"label": "barcelona.jpg", "icon": "pi pi-image", "data": "Barcelona Photo"},
    //           {"label": "logo.jpg", "icon": "pi pi-image", "data": "PrimeFaces Logo"},
    //           {"label": "primeui.png", "icon": "pi pi-image", "data": "PrimeUI Logo"}]
    //   },
    //   {
    //       "label": "Movies",
    //       "data": "Movies Folder",
    //       "expandedIcon": "pi pi-folder-open",
    //       "collapsedIcon": "pi pi-folder",
    //       "children": [{
    //               "label": "Al Pacino",
    //               "data": "Pacino Movies",
    //               "children": [{"label": "Scarface", "icon": "pi pi-video", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "pi pi-video", "data": "Serpico Movie"}]
    //           },
    //           {
    //               "label": "Robert De Niro",
    //               "data": "De Niro Movies",
    //               "children": [{"label": "Goodfellas", "icon": "pi pi-video", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "pi pi-video", "data": "Untouchables Movie"}]
    //           }]
    //   }
    // ]
    this.JobTitleId = Number(this.config.data.id);
    this.getAllJobTitleCategories();
  }
  nodeSelect(event:any) {
    this.selectedCategoryId = Number(event.node.data);
    this.selectdNodeType = event.node.nodeType
  }
  nodeUnselect(event:any) {
    console.log( event.node.data);
  }
  getAllJobTitleCategories(){
    this.jobTitleService.getAllJobTitleCategories().subscribe((res: any) => {
      if (res?.success) {
        this.files1 = res?.data;
      }
    });
  }
  closeModal(): void {
    this.ref.close();
  }
  saveAssociatedJobs(){
    let item: any = { 
      jobTitleId:  this.JobTitleId, 
      selectedCategoryId:  this.selectedCategoryId,
      nodeType : this.selectdNodeType,
    }; 
    this.loadingService.doLoading(
    this.jobTitleService.saveAssociatedJobs(item),this).subscribe((res: any) => {
      if (res?.success) {
        Swal.fire({
          title: 'Success',
          text: 'Job Associated Successfully.',
          icon: 'success',
        }).then((result) => {
          
        });
        this.closeModal();
      }

    });
  }



}
