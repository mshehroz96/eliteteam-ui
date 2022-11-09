import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { List, ListItem } from 'src/app/_models/admin/list';
import { ListService } from 'src/app/_services/list/list.service';
import Swal from 'sweetalert2';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { ListItemDetailsComponent } from './list-item-details/list-item-details.component';
//import { ListItemDetailsComponent } from './list-item-details/list-item-details.component';

@Component({
  selector: 'list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  @Input() listItems!: ListItem[];
  @Input() selectedList!: List;
  //@Input() enableQuestionSetting: boolean = false;

  ref!: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private listService: ListService) { }

  ngOnInit(): void {
    this.getListItems();

  }



  addQuestion() {
    var aa = this.selectedList;
    this.ref = this.dialogService.open(ListItemDetailsComponent, {
      header: 'Add Question',
      data: {
        listId: this.selectedList.listId,
        action: 'Add'
      },
       width: '50%',
       contentStyle: { "max-height": "500px", "overflow": "auto" },
       baseZIndex: 10000
     });

    this.ref.onClose.subscribe((listitems: any) => {
      this.getListItems();
    });
  }
  deleteListItem(listItem: ListItem) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this list item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {

        this.listService.deleteListItem(listItem).subscribe((res) => {
          if (res.success) {
            this.getListItems();
            //console.log("deleted");
            //this.questions.splice(this.questions.findIndex(x => x.screeningQuestionId == question.screeningQuestionId), 1);
          }
        })

      }
    });
  }
  getListItems() {
    console.log(this.selectedList.listId)
    this.listService.getListItemsByListId(this.selectedList.listId).subscribe((res) => {
      this.listItems = res?.data;
    });
  }
  editQuestion(listItem: ListItem) {
    console.log(listItem);
    this.ref = this.dialogService.open(ListItemDetailsComponent, {
        header: 'Edit List Item',
        data: {
          obj: listItem,
          action: 'Edit'
        },
        width: '50%',
        contentStyle: { "max-height": "500px", "overflow": "auto" },
        baseZIndex: 10000
      });

      this.ref.onClose.subscribe((question: any) => {
          this.getListItems();
      });
  }


}
