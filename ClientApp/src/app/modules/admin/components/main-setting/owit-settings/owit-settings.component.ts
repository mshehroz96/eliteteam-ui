import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IOWITFiters } from 'src/app/_models/AdminSettingCruds/IAdminSettingCruds';
import { AuthenticationService, CommonService } from 'src/app/_services';
import { AdminSettingCrudsService } from 'src/app/_services/admin-setting-cruds/admin-setting-cruds.service';
import Swal from 'sweetalert2';
import { AddUpdateOwitComponent } from './add-update-owit/add-update-owit.component';

@Component({
  selector: 'app-owit-settings',
  templateUrl: './owit-settings.component.html',
  styleUrls: ['./owit-settings.component.css']
})
export class OwitSettingsComponent implements OnInit {
  owitList: any[] = [];
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
  getAllOWIT(params: IOWITFiters) {
    this.loading = true;
    params.searchKeyword = this.searchFilter;
    params.globalFilter = this.searchFilter;
    this.service.getAllOWIT(params).subscribe((res) => {
      if (res?.success) {
        this.owitList = res?.data;
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }
  
  openSaveUpdateOWITModal(){
    this.ref = this.dialogService.open(AddUpdateOwitComponent, {
      header: 'Add OWIT',
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
        this.getAllOWIT({});
      }
    })
  }
  editOWIT(item:any){
    this.ref = this.dialogService.open(AddUpdateOwitComponent, {
      header: 'Edit OWIT',
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
        this.getAllOWIT({});
      }
    })
  }
  deleteOWIT(item:any){

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
        
        this.service.deleteOWIT(item).subscribe((res) => {
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
          this.getAllOWIT({});
        });

      }
    })
  }
}
