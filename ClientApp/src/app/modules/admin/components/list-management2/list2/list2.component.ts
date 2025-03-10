import { Component, OnInit } from '@angular/core';
import { List2Service } from 'src/app/_services/list2/list2.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUpdateList2Component } from './add-update-list2/add-update-list2.component';


@Component({
  selector: 'list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.css']
})
export class List2Component implements OnInit {

  lists: any[] = [];
  searchText : string = '';

  selectedList: any;
  ref: DynamicDialogRef | undefined;
  constructor(private list2Service: List2Service, private dialogService: DialogService) {
   }

  ngOnInit(): void {
    this.getLists();
  }

  getLists() {
    this.list2Service.getLists().subscribe((res) => {
      this.lists = res.data;
    });
  }

  selectList(list: any) {
    this.selectedList = list.listId;
  }

  searchList(){

     this.list2Service.searchList(this.searchText).subscribe((res:any)=> {
        if(res?.success)
        {
            this.lists = res.data;
        }
     })

  }

  // addList() {
  //   this.ref = this.dialogService.open(AddUpdateList2Component, {
  //     data: {
  //       action: 'add',
  //       obj : null
  //     },
  //     header: 'Add List',
  //     width: '50%',
  //     height: '100%'
  //   });
  // }

  addList() {
    this.ref = this.dialogService.open(AddUpdateList2Component, {
      data: {
        action: 'add',
        obj: null
      },
      header: 'Add List',
      width: '50%',
      height: '100%'
    });
    debugger;

    this.ref.onClose.subscribe(() => {
      this.getLists();
      // if (this.selectedList) {
      //   this.getListItems();
      // }
    });
  }

  updateList() {


    this.ref = this.dialogService.open(AddUpdateList2Component, {
      data: {
        action: 'update',
        obj: this.lists.find(x => x.listId === this.selectedList)
      },
      header: 'Update List',
      width: '50%',
      height: '100%'
    });

    debugger;
    this.ref.onClose.subscribe(() => {
      this.getLists();
    });


  }


  deleteList()
  {
    let obj = JSON.stringify(this.lists.find(x=> x.listId == this.selectedList));
    this.list2Service.deleteList(obj).subscribe((res:any)=>{
      if(res?.success)
      {
          console.log('list deleted successfully');
      }
    }, (error : any)=> {
      console.error(error);
    })    
  }
}
