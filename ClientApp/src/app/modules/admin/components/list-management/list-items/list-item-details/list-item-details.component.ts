import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { ListItem } from 'src/app/_models/admin/list';
import { ScreeningQuestion, ScreeningQuestionOption } from 'src/app/_models/requisition/screening-question';
import { ListService } from 'src/app/_services/list/list.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';

@Component({
  selector: 'list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.css']
})
export class ListItemDetailsComponent implements OnInit {

  listItem: ListItem;
  submitted: boolean = false;
  categories: any[] = [];
  listIId:number = 0;
  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private service: ListService) {
    this.listItem = new ListItem();
  }

  ngOnInit(): void {
    if(this.config.data.obj){
      this.listItem = this.config.data.obj;
    }
    if(this.config.data.listId){
      this.listIId = this.config.data.listId;
    }
  }


  closeModal(): void {
    this.ref.close(this.listItem);
  }


  saveListItem() {
    this.submitted = true;
    if(this.listIId){
      this.listItem.listId = this.listIId;
    }
    this.service.addUpdateListItem(this.listItem)
      .pipe(first())
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error: any) => {
          console.log('Error', error);
        }
      });
  }
}
