import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { ScreeningQuestionCategory } from 'src/app/_models/requisition/screening-question';
import { CommonService } from 'src/app/_services/common/common.service';
import { OneWayInterviewService } from 'src/app/_services/one-way-interview/one-way-interview.service';
import { ScreeningQuestionService } from 'src/app/_services/screening-question/screening-question.service';

@Component({
  selector: 'app-screening-category-details',
  templateUrl: './screening-category-details.component.html',
  styleUrls: ['./screening-category-details.component.css']
})
export class ScreeningCategoryDetailsComponent implements OnInit {

  category: ScreeningQuestionCategory;
  submitted: boolean = false;
  suggestions: any[] = [];

  constructor(private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private screeningQuestionService: ScreeningQuestionService,
    private commonService: CommonService) {
    this.category = new ScreeningQuestionCategory();
  }

  ngOnInit(): void {

    this.category.screeningQuestionCategoryId = Number(this.config.data.id);

    if (this.category.screeningQuestionCategoryId > 0) {
      this.screeningQuestionService.getScreeningQuestionCategoryById(this.category.screeningQuestionCategoryId).subscribe((res) => {
        if (res?.success) {
          this.category = res.data;
        }

      });
    }

  }

  closeModal(): void {
    this.ref.close(this.category);
  }


  saveCategory() {
    this.submitted = true;
    console.log(this.category);
    this.screeningQuestionService.CreateOrUpdateScreeningQuestionCategory(this.category)
      .pipe(first())
      .subscribe({
        next: () => {
          this.closeModal();
        },
        error: error => {
          console.log('Error', error);
        }
      });
  }
}
