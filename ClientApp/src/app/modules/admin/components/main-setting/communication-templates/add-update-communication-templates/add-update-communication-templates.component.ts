import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { ComboBox } from 'src/app/_models/common/common';
import { CommunicationPageData, ICommunicationTemplate } from 'src/app/_models/communication-templates/ICommunicationTemplate';
import { CommonService } from 'src/app/_services';
import { CommunicationTemplatesService } from 'src/app/_services/communication-templates/communication-templates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-communication-templates',
  templateUrl: './add-update-communication-templates.component.html',
  styleUrls: ['./add-update-communication-templates.component.css']
})
export class AddUpdateCommunicationTemplatesComponent implements OnInit {

  obj:ICommunicationTemplate;
  dropdowns:CommunicationPageData = new CommunicationPageData();
  selectedType?:any = {displayText: "--Select--",value: 0};
  selectedDesc?:string;
  copyList!:any[];
  selectedListItem?:any;submitted: boolean = false;
  constructor(public config: DynamicDialogConfig,private ref: DynamicDialogRef,private service: CommunicationTemplatesService,private common:CommonService) {
    this.obj = {};
   }

  ngOnInit() {
    this.getListItems();
    this.getCommunicatinoPageData();
    this.copyList = [];
  }
  getListItems(){
    this.common.getListItems(LIST_TYPES.COPY_VARIABLES).subscribe((res) => {
      if(res.success){
        this.copyList = res.data;
      }
    });
  }
  closeModal(): void {
    this.ref.close(this.obj);
  }
  saveUpdateTemplate(){
    this.submitted = true;
    this.service.saveUpdateTemplate(this.obj).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: 'Template Saved/Updated Successfully',
          icon: 'success',
        }).then((result) => {
          this.ref.close({});
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong!',
          icon: 'error',
        }).then((result) => {

        });
      }
    });
  }
  getCommunicatinoPageData(){

    if(this.config.data.obj)
        this.obj = this.config.data.obj;

        console.log(this.obj);
    
    this.service.getCommunicationPageData().subscribe((res) => {
      this.dropdowns = res.data;
      
        // if(this.obj.communicationTemplateTypeLIID){
        //   this.selectedType = {
        //     displayText: this.obj.communicationTemplateTypeName,
        //     value: this.obj.communicationTemplateTypeLIID
        //   }
        // }
        
      //}
    });
  }
  getCopyVar(){
    navigator.clipboard.writeText("{{" + this.selectedListItem.displayText + "}}");
    Swal.fire({
      title: 'Copied to Clipboard!',
      text: "",
      icon: 'success',
    })
  }
}
