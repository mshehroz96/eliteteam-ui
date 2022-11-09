import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-threshold-values',
  templateUrl: './edit-threshold-values.component.html',
  styleUrls: ['./edit-threshold-values.component.css']
})
export class EditThresholdValuesComponent implements OnInit {
  
  obj:any;
  constructor(
    public config: DynamicDialogConfig,private ref: DynamicDialogRef) {
    this.obj = {};
   }

   submitted: boolean = false;
  ngOnInit() {
    this.obj = this.config.data.obj;
  }
  
  closeModal(): void {
    this.ref.close(this.obj);
  }
  
  updateThresholdValues() {
    this.submitted = true;
    // if(this.listIId){
    //   this.listItem.listId = this.listIId;
    // }
    // this.service.addUpdateListItem(this.listItem)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       this.closeModal();
    //     },
    //     error: (error: any) => {
    //       console.log('Error', error);
    //     }
    //   });
  }



}
