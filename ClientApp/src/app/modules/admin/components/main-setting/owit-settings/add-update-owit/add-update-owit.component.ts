import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminSettingCrudsService } from 'src/app/_services/admin-setting-cruds/admin-setting-cruds.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-owit',
  templateUrl: './add-update-owit.component.html',
  styleUrls: ['./add-update-owit.component.css']
})
export class AddUpdateOwitComponent implements OnInit {
  questions:any;
  action:string = "";
  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private service: AdminSettingCrudsService
    ) { 
      this.questions = {};
  }

  ngOnInit() {
    if(this.config.data.obj){
      this.questions = this.config.data.obj;
    }
  }
  saveUpdateOWIT(){
    // let que = {
    //   oneWayInterviewQuestionBankID:0,
    //   questionText: this.questions.questionText,
    //   recordStatusLIID:1,
    //   orderNo:1,
    //   createdOn:"",
    //   createdBy:1,
    //   lastModifiedOn:"",
    //   lastModifiedBy:0,
    //   totalRecords:0,

    // };
    console.log(this.questions)
    this.service.saveUpdateOWIT(this.questions).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: res.message,
          icon: 'success',
        }).then((result) => {
          this.ref.close({});
        });

      } else {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        })
      }
    });
  }
  
  closeModal(): void {
    this.ref.close(this.questions);
  }
}
