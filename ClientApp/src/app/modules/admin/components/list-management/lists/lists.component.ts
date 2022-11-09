import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetListsRequest, List, ListItem } from 'src/app/_models/admin/list';
import { ListService } from 'src/app/_services/list/list.service';
import Swal from 'sweetalert2';
import { ListItemsComponent } from '../list-items/list-items.component';
import { AddUpdateListComponent } from './add-update-list/add-update-list.component';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists!: List[];
  listItems!: ListItem[];
  selectedList: List;
  getListsRequest: GetListsRequest;
  autoCompleteResults: any[] = [];
  selected:any;
  isClicked = false;
  constructor(private dialogService: DialogService,private listService:ListService) {
    this.selectedList=new List();
    this.getListsRequest=new GetListsRequest();
  }

  ref!: DynamicDialogRef;

  ngOnInit(): void {
    this.getLists();
  }
  getLists(){
    this.listService.getLists(this.getListsRequest).subscribe((res) => {
      this.lists = res?.data;
      if(this.selected){
        this.lists = this.lists.filter((item) => item.listId == this.selected.listId)
        this.getListItems(this.selected.listId);
        this.selectedList.listId = this.selected.listId;
      }
      else{
        this.lists = res?.data;
      }
    });
  }


  selectList(list: List) {
    this.isClicked = true;
    this.selectedList = list;
    this.getListItems(this.selectedList.listId);
  }

  getListItems(listId: number) {
    this.listService.getListItemsByListId(listId).subscribe((res) => {
      if (res?.success) {
        this.listItems = res.data;
      }
    });
  }
  addNewList(){
    this.ref = this.dialogService.open(AddUpdateListComponent, {
      header: 'Add List',
      data: {
        obj: null,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((category: any) => {
      this.getLists();
    });
  }
  editList(){
    this.ref = this.dialogService.open(AddUpdateListComponent, {
      header: 'Edit List',
      data: {
        obj:this.selectedList,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((category: any) => {
      this.getLists();
    });
  }
  deleteList(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this record!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listService.DeleteList(this.selectedList).subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'Success',
              text: res.message,
              icon: 'success',
            }).then((result) => {
              this.closeModal();
              this.getLists();
              this.selected = {};
            });
    
          } else {
            Swal.fire({
              title: 'Error',
              text: res.message,
              icon: 'error',
            }).then((result) => {
              this.closeModal();
              this.getLists();
              this.selected = {};
            });
          }
        });
      }
    });
  }
  closeModal(): void {
    this.ref.close();
  }
  searchList(event: any) {
    this.listService.searchList(event.query).subscribe((res: any) => {
      if (res?.success) {
        this.autoCompleteResults = res?.data;
      }
    });
  }
  clearSearch(){
    this.selected = undefined;
    this.selectedList.listId = 0;
    this.isClicked = false;
    this.getLists();
  }

}
