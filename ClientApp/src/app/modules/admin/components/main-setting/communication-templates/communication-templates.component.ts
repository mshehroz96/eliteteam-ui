import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { ListItem } from 'src/app/_models/admin/list';
import { CommunicationFilters, ICommunicationTemplate } from 'src/app/_models/communication-templates/ICommunicationTemplate';
import { CommonService } from 'src/app/_services';
import { CommunicationTemplatesService } from 'src/app/_services/communication-templates/communication-templates.service';
import Swal from 'sweetalert2';
import { AddUpdateCommunicationTemplatesComponent } from './add-update-communication-templates/add-update-communication-templates.component';

@Component({
  selector: 'app-communication-templates',
  templateUrl: './communication-templates.component.html',
  styleUrls: ['./communication-templates.component.css']
})
export class CommunicationTemplatesComponent implements OnInit {

  constructor(
    private dialog: MatDialog, private dialogService: DialogService,
    private service: CommunicationTemplatesService,
    private common : CommonService
  ) { }
  comList: ICommunicationTemplate[] = [];
  ref!: DynamicDialogRef;
  loading:boolean = false;
  searchFilter: string = '';
  totalRecords: number = 0;
  options:any[]=[];
  channelId:number = 0;
  ngOnInit() {
  }
  getAll(params: CommunicationFilters) {
    this.loading = true;
    params.filter1 = this.channelId ? this.channelId : 0;
    params.globalFilter = this.searchFilter;
    params.searchKeyword = this.searchFilter;
    this.service.getAllCommunicationTemplates(params).subscribe((res) => {
      if (res?.success) {
        this.comList = res?.data?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
    this.getlistItems();
  }
  getlistItems(){
    this.common.getListItems(LIST_TYPES.COMMUNICATION_CHANNELS).subscribe((res) => {
      if(res.success)
        this.options=res.data;
    });
  }
  addCommunicationTemplates() {
    this.ref = this.dialogService.open(AddUpdateCommunicationTemplatesComponent, {
      header: 'Add Communication Template',
      data:{
        obj:null
      },
      width: '60%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getAll({});
    }); 

  }
  updateCommunicationTemplates(obj:ICommunicationTemplate) {
    this.ref = this.dialogService.open(AddUpdateCommunicationTemplatesComponent, {
      header: 'Update Communication Template',
      data: {
        obj: obj,
      },
      width: '60%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getAll({});
    }); 
  }
  copyCommunicationTemplates(obj:ICommunicationTemplate){
    this.loading = true;
    this.service.copyTemplate(obj).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: 'Template Copied Successfully',
          icon: 'success',
        }).then((result) => {
          this.getAll({});
          this.loading = false;
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong!',
          icon: 'error',
        }).then((result) => {
          this.getAll({});
          this.loading = false;
        });
      }
    });
  }
  deleteCommunicationTemplates(obj:ICommunicationTemplate) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this template?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCommunicationTemplates(obj).subscribe((res) => {
          if (res?.success) {
            Swal.fire({
              title: 'Success',
              text: 'Template Deleted Successfully',
              icon: 'success',
            }).then((result) => {
              this.ref.close({});
            });
            this.getAll({});
          }
        });
      }
    })
    
  }

}
