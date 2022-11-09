import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { CommonService, JobTitleService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-job-title-category',
  templateUrl: './add-job-title-category.component.html',
  styleUrls: ['./add-job-title-category.component.css']
})
export class AddJobTitleCategoryComponent implements OnInit {

  JobTitleId:number = 0;
  categories:any[] = [];
  selectedCategories: any[] = [];

  constructor(
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonService: CommonService,
    private readonly jobTitleService: JobTitleService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.JobTitleId = Number(this.config.data.id);
    this.getAllCategories();
    
  }
  closeModal(): void {
    this.ref.close(this.JobTitleId);
  }
  getAllCategories(){
    this.commonService.getAllCategories().subscribe((res: any) => {
      if (res?.success) {
        this.categories = res?.data;
        if(this.config.data.selected.length > 0){
          this.selectedCategories = this.config.data.selected;
        }
      }
    });
  }
  saveJobTitleCategories(){
    
    let array: any[] = [];
    if(this.selectedCategories && this.selectedCategories.length > 0){
      this.selectedCategories.forEach((element) => {
        let item: any = 
          { 
            jobTitleId: this.JobTitleId, 
            screeningQuestionCategoryId: element
          };  
        array.push(item);
      })
    }
    this.loadingService.doLoading(
    this.jobTitleService.saveJobTitleCategories(array),this).subscribe((res: any) => {
      if (res?.success) {
        Swal.fire({
          title: 'Success',
          text: 'One way interview template has been updated successfully.',
          icon: 'success',
        }).then((result) => {
          this.closeModal();
        });
      }
    });
  }


}
