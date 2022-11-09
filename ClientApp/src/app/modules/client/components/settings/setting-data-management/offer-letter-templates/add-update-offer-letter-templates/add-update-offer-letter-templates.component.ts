import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IOfferLetterTemplates } from 'src/app/_models/client/IOfferLetterTemplates';
import { ComboBox } from 'src/app/_models/common/common';
import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-offer-letter-templates',
  templateUrl: './add-update-offer-letter-templates.component.html',
  styleUrls: ['./add-update-offer-letter-templates.component.css']
})
export class AddUpdateOfferLetterTemplatesComponent implements OnInit {

  obj:IOfferLetterTemplates;
  recordStatus:ComboBox[] = [];
  constructor(public config: DynamicDialogConfig,private ref: DynamicDialogRef,private service: ClientService) {
    this.obj = {};
    
   }

  ngOnInit() {
    if(this.config.data.obj)
        this.obj = this.config.data.obj;

    this.recordStatus = [
      {
         displayText:"Active",
         value:1
      },
      {
        displayText:"Inactive",
        value:2
      },
      {
        displayText:"Archived",
        value:3
      }

    ]
  }
  
  closeModal(): void {
    this.ref.close(this.obj);
  }
  saveUpdateTemplate(){
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
}
