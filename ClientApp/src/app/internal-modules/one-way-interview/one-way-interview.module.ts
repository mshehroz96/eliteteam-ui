import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneWayInterviewTemplatesComponent } from './components/one-way-interview-templates/one-way-interview-templates.component';
import { OneWayInterviewQuestionsComponent } from './components/one-way-interview-questions/one-way-interview-questions.component';
import { CardModule } from 'primeng/card';
import { QuestionDetailsComponent } from './components/one-way-interview-questions/question-details/question-details.component';
import { TemplateDetailsComponent } from './components/one-way-interview-templates/template-details/template-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { QuestionConfigComponent } from './components/one-way-interview-questions/question-config/question-config.component';

@NgModule({
  declarations: [
    OneWayInterviewTemplatesComponent,
    OneWayInterviewQuestionsComponent,
    QuestionDetailsComponent,
    TemplateDetailsComponent,
    QuestionConfigComponent,
    
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule
  ],
  exports: [
    OneWayInterviewTemplatesComponent
  ]
})
export class OneWayInterviewModule { }
