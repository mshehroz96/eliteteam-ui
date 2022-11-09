import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LIST_TYPES } from 'src/app';
import { CommonService } from 'src/app/_services';
import { AdminSettingCrudsService } from 'src/app/_services/admin-setting-cruds/admin-setting-cruds.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-offer-letter-template',
  templateUrl: './add-update-offer-letter-template.component.html',
  styleUrls: ['./add-update-offer-letter-template.component.css']
})
export class AddUpdateOfferLetterTemplateComponent implements OnInit {

  obj:any;
  copyList!:any[];
  selectedListItem?:any;
  constructor(public config: DynamicDialogConfig,private ref: DynamicDialogRef,private service: AdminSettingCrudsService,private common:CommonService) {
    this.obj = {};
   }

  ngOnInit() {
    this.getListItems();
    this.copyList = [];
    if(this.config.data.obj){
      this.obj = this.config.data.obj;
    }
  }
  getListItems(){
    this.common.getListItems(LIST_TYPES.COPY_VARIABLES_OFFER_LETTER).subscribe((res) => {
      if(res.success){
        this.copyList = res.data;
      }
    });
  }
  closeModal(): void {
    this.ref.close(this.obj);
  }
  save(){
    this.service.saveUpdateOfferLetters(this.obj).subscribe((res) => {
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
  getCopyVar(){
    navigator.clipboard.writeText("{{" + this.selectedListItem.displayText + "}}");
    Swal.fire({
      title: 'Copied to Clipboard!',
      text: "",
      icon: 'success',
    })
  }
}
