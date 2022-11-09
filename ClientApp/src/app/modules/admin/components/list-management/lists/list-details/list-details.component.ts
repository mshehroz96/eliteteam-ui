import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { List } from 'src/app/_models/admin/list';
import { CommonService } from 'src/app/_services/common/common.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { ListService } from 'src/app/_services/list/list.service';

@Component({
  selector: 'list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

  list: List;
  submitted: boolean = false;
  suggestions: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private listService: ListService,
    private commonService: CommonService) {
    this.list = new List();
  }

  ngOnInit(): void {

    this.list.listId = Number(this.config.data.id);

    if (this.list.listId > 0) {
      //this.listService.getListItemCategoryById(this.list.screeningQuestionCategoryId).subscribe((res) => {
      this.listService.getListCategoryById(this.list.listId).subscribe((res) => {
        if (res?.success) {
          this.list = res.data;
        }
      });
    }

  }

  closeModal(): void {
    this.ref.close(this.list);
  }


  saveList() {
    this.submitted = true;
    this.listService.CreateOrUpdateList(this.list)
      .pipe(first())
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: error => {
          console.log('Error', error);
        }
      });
  }
}
