import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { List2Service } from 'src/app/_services/list2/list2.service';
import { AddUpdateListitem2Component } from './add-update-listitem2/add-update-listitem2.component';

@Component({
  selector: 'app-listitem2',
  templateUrl: './listitem2.component.html',
  styleUrls: ['./listitem2.component.css']
})
export class Listitem2Component implements OnInit {
  listItems: any[] = [];
  ref!: DynamicDialogRef;
  @Input() selectedList: any = 0;
  constructor(private listService: List2Service, private dialog: DialogService) { }

  ngOnInit(): void {
    debugger;
    if (this.selectedList) this.getListItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedList'] && this.selectedList) {
      this.getListItems();
    }
  }

  getListItems() {
    this.listService.getListItems(this.selectedList.listId).subscribe((res) => {
      if (res?.success) {
        this.listItems = res.data;
      }
    }
      , (error: any) => {
        console.log(error);
      });
  }

  onAddEdit(listItem: any) {

    this.ref = this.dialog.open(AddUpdateListitem2Component, {
      data: {
        action: listItem == null ? 'edit' : 'add',
        listItem: listItem,
        listId : this.selectedList
      },
      header: 'Edit List Item',
      width: '50%',
      height: '200px%'
    });

    this.ref.onClose.subscribe((res: any) => {
      debugger;
      this.getListItems();
    });
  }

  onDelete(listItem: any) {
    this.listService.deleteListItem(listItem).subscribe((res) => {
      if (res?.success) {
        alert('List Item deleted successfully');
        this.getListItems();
      }
    });
  }

 
}
