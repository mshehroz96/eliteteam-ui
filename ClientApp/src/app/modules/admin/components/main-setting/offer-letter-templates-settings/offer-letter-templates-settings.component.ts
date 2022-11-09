import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IOWITFiters } from 'src/app/_models/AdminSettingCruds/IAdminSettingCruds';
import { AuthenticationService, CommonService } from 'src/app/_services';
import { AdminSettingCrudsService } from 'src/app/_services/admin-setting-cruds/admin-setting-cruds.service';
import Swal from 'sweetalert2';
import { AddUpdateOfferLetterTemplateComponent } from './add-update-offer-letter-template/add-update-offer-letter-template.component';

@Component({
  selector: 'app-offer-letter-templates-settings',
  templateUrl: './offer-letter-templates-settings.component.html',
  styleUrls: ['./offer-letter-templates-settings.component.css']
})
export class OfferLetterTemplatesSettingsComponent implements OnInit {

  list: any[] = [];
  ref!: DynamicDialogRef;
  totalRecords: number = 0;
  searchFilter: string = '';
  loading: boolean = false;
  constructor( private route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly authenticationService: AuthenticationService,
    private readonly service: AdminSettingCrudsService,
    private dialogService: DialogService) { }

  ngOnInit() {
  }
  getAll(params: IOWITFiters) {
    this.loading = true;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.service.getAllOfferLetters(params).subscribe((res) => {
      if (res?.success) {
        this.list = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  
 save(){
    this.ref = this.dialogService.open(AddUpdateOfferLetterTemplateComponent, {
      header: 'Add',
      data:{
        obj:null,
        action:"Add"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getAll({});
      }
    })
  }
  edit(item:any){
    this.ref = this.dialogService.open(AddUpdateOfferLetterTemplateComponent, {
      header: 'Edit',
      data:{
        obj:item,
        action:"Edit"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.getAll({});
      }
    })
  }
  deleteItem(item:any){

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this item?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        
        this.service.deleteOfferLetters(item).subscribe((res) => {
          if (res.success) {
            Swal.fire({
              title: 'Success',
              text: res.message,
              icon: 'success',
            }).then((result) => {
              this.ref.close({});
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: res.message,
              icon: 'error',
            })
          }
          this.getAll({});
        });

      }
    })
  }
}
