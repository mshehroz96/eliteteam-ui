import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-requisition-recruiters-view',
  templateUrl: './requisition-recruiters-view.component.html',
  styleUrls: ['./requisition-recruiters-view.component.css']
})
export class RequisitionRecruitersViewComponent implements OnInit {

  @Input() recruiters: any[]=[];
  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    if (this.ref) {

      if (this.config.data && this.config.data.recruiters) {
        this.recruiters=this.config.data.recruiters;
      }

    }
  }

  ngOnInit(): void {

  }

}
