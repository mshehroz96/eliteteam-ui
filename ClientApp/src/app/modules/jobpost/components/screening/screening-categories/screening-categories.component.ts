import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScreeningQuestion, ScreeningQuestionCategory } from 'src/app/_models/requisition/screening-question';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';
import Swal from 'sweetalert2';
import { ScreeningCategoryDetailsComponent } from './screening-category-details/screening-category-details.component';

@Component({
  selector: 'app-screening-categories',
  templateUrl: './screening-categories.component.html',
  styleUrls: ['./screening-categories.component.css']
})
export class ScreeningCategoriesComponent implements OnInit {

  categories!: ScreeningQuestionCategory[];
  questions!: ScreeningQuestion[];
  selectedCategory: ScreeningQuestionCategory;
  constructor(private dialogService: DialogService,private screeningQuestionService:ScreeningQuestionService) { 
    this.selectedCategory=new ScreeningQuestionCategory();
  }

  ref!: DynamicDialogRef;
  
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){

    this.screeningQuestionService.getScreeningQuestionCategories().subscribe((res) => {
      this.categories = res?.data;
    });

  }
  addCategory() {
    this.ref = this.dialogService.open(ScreeningCategoryDetailsComponent, {
      header: 'Add Category',
      data: {
        id: 0,
        action: 'Add'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((category: any) => {
      this.getCategories();
    });
  }
  deleteCategory() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
          this.screeningQuestionService.deleteScreeningQuestionCategory(this.selectedCategory.screeningQuestionCategoryId).subscribe((res)=>
          {
            this.getCategories();
          })
      }
    });
  }
  editCategory() {
    this.ref = this.dialogService.open(ScreeningCategoryDetailsComponent, {
      header: 'Edit Category',
      data: {
        id: this.selectedCategory.screeningQuestionCategoryId,
        action: 'Edit'
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((category: any) => {
      this.getCategories();
    });

  }
  selectCategory(category: ScreeningQuestionCategory) {

    this.selectedCategory = category;

    this.getCategoryQuestions(this.selectedCategory.screeningQuestionCategoryId);
  }

  getCategoryQuestions(screeningQuestionCategoryId: number) {
    this.screeningQuestionService.getScreeningQuestionsByCategoryId(screeningQuestionCategoryId).subscribe((res) => {
      if (res?.success) {
        this.questions = res.data;
      }
    });
  }

}
