import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { List2Service } from 'src/app/_services/list2/list2.service';

@Component({
  selector: 'app-add-update-list2',
  templateUrl: './add-update-list2.component.html',
  styleUrls: ['./add-update-list2.component.css']
})
export class AddUpdateList2Component implements OnInit {

   listFrm : FormGroup = new FormGroup({});

  constructor(private lstService : List2Service,
     public config : DynamicDialogConfig,
     public ref : DynamicDialogRef) { 
   
  }

  ngOnInit(): void {
    this.listFrm = new FormGroup({
      listId : new FormControl(),
      keyCode : new FormControl(),
      title : new FormControl(),
      description : new FormControl(),
      isSystemManaged : new FormControl(),
      orderNo : new FormControl()
  });

  if(this.config.data.obj){
    this.listFrm.patchValue(this.config.data.obj);
  }
}

  addUpdateList()
  {
      let obj = JSON.stringify(this.listFrm.value);

      this.lstService.addUpdateList(obj).subscribe((res : any)=> {
          if(res?.success)
          {
              if(this.config?.data?.action == 'add')
              {
                console.log('List added successfully');
              }
              else
              {
                console.log('List updated successfully');
              }
              this.ref.close();
          }
      }, (error : any)=>{
        console.error(`error occured while adding list : ${error}`);
      })
    
  }

  cancel()
  {
      this.ref.close();
  }

}