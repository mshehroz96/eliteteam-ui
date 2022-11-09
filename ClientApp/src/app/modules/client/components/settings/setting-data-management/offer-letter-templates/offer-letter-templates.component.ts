import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IOfferLetterFilters, IOfferLetterTemplates } from 'src/app/_models/client/IOfferLetterTemplates';
import { ClientService } from 'src/app/_services/client/client.service';
import Swal from 'sweetalert2';
import { AddUpdateOfferLetterTemplatesComponent } from './add-update-offer-letter-templates/add-update-offer-letter-templates.component';
@Component({
  selector: 'app-offer-letter-templates',
  templateUrl: './offer-letter-templates.component.html',
  styleUrls: ['./offer-letter-templates.component.css']
})
export class OfferLetterTemplatesComponent implements OnInit {

  constructor(
    private dialog: MatDialog, private dialogService: DialogService,
    private service: ClientService
  ) { }
  offerLetterList: IOfferLetterTemplates[] = [];
  ref!: DynamicDialogRef;
  loading:boolean = false;
  searchFilter: string = '';
  totalRecords: number = 0;
  ngOnInit() {

  }
  getAll(params: IOfferLetterFilters) {
    this.loading = true;
    params.globalFilter = this.searchFilter;
    params.searchKeyword = this.searchFilter;
    this.service.getAllOfferTemplates(params).subscribe((res) => {
      if (res?.success) {
        this.offerLetterList = res?.data?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  
  addOfferLetterTemplates() {
    this.ref = this.dialogService.open(AddUpdateOfferLetterTemplatesComponent, {
      header: 'Add Offer Letter Template',
      data:{
        obj:null
      },
      width: '50%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getAll({});
    }); 

  }
  updateOfferLetterTemplates(obj:IOfferLetterTemplates) {
    this.ref = this.dialogService.open(AddUpdateOfferLetterTemplatesComponent, {
      header: 'Update Offer Letter Template',
      data: {
        obj: obj,
      },
      width: '50%',
      contentStyle: { "max-height": "1000px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getAll({});
    }); 
  }
  deleteOfferLetterTemplates(obj:IOfferLetterTemplates) {
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
        this.service.deleteOfferLetterTemplates(obj).subscribe((res) => {
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
