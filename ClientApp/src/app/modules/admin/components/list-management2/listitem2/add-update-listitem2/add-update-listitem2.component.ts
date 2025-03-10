import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { List2Service } from 'src/app/_services/list2/list2.service';

@Component({
  selector: 'app-add-update-listitem2',
  templateUrl: './add-update-listitem2.component.html',
  styleUrls: ['./add-update-listitem2.component.css']
})
export class AddUpdateListitem2Component implements OnInit, OnChanges {
  @Input() selectedListId: number;

  listItem: any = {};
  action : string = 'Add';
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private listService: List2Service) {


  }

  ngOnInit(): void {
    if (this.config.data.listItem) {
      this.listItem = this.config.data.listItem;
      this.action = 'Edit';
    }
    
    if(this.config.data.listId)
    {
       this.selectedListId = this.config.data.listId;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedListId) {
      console.log('Selected List ID changed:', this.selectedListId);
    }
  }

  onCancel()
  {
    this.ref.close();
  }

  addListItem() {
    this.listItem.listId = this.selectedListId;
    let item = JSON.stringify(this.listItem);
    this.listService.addUpdateListItem(item).subscribe((res: any) => {
      if (res?.success) {
        alert("List Item Added Successfully");
        this.ref.close(this.listItem);
      }
    });
  }
}
