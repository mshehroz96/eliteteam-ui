import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { List } from 'src/app/_models/admin/list';
import { CommonService } from 'src/app/_services';
import { LIST_TYPES } from 'src/app';
import { ComboBox } from 'src/app/_models/common/common';
import { ListService } from 'src/app/_services/list/list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-list',
  templateUrl: './add-update-list.component.html',
  styleUrls: ['./add-update-list.component.css']
})
export class AddUpdateListComponent implements OnInit {
  selectedList!: List;
  recordStatuses:ComboBox[] = [];
  constructor(
    public config: DynamicDialogConfig,
    public service: ListService,
    public commonService:CommonService,
    public ref : DynamicDialogRef
  ) { 
    this.selectedList  = new List();
  }

  ngOnInit() {
    if(this.config.data.obj){
      this.selectedList = this.config.data.obj;
    } 
    this.getRecordStatuses();
  }
  getRecordStatuses(){
    this.commonService.getListItems(LIST_TYPES.REC_STATUS).subscribe((res: any) => {
      if (res.success) {
        this.recordStatuses = res.data;
        
      }
    });
  }
  saveUpdateList(){
    this.service.saveUpdateList(this.selectedList).subscribe((res: any) => {
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
        }).then((result) => {
          this.ref.close({});
        });
      }
      this.closeModal();
    });
  }
  closeModal(): void {
    this.ref.close(this.selectedList);
  }

}
