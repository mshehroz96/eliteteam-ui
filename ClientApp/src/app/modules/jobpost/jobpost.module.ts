import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobpostRoutingModule } from './jobpost-routing.module';
import { JobpostComponent } from './jobpost.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_shared/shared.module';
import { JobsPendingComponent } from './components/jobs-pending/jobs-pending.component';
import { JobsActiveComponent } from './components/jobs-active/jobs-active.component';
import { JobsInactiveComponent } from './components/jobs-inactive/jobs-inactive.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { SettingsJobTitlesComponent } from './components/settings/settings-job-titles/settings-job-titles.component';
import { SettingsInterviewQuestionsComponent } from './components/settings/settings-interview-questions/settings-interview-questions.component';
import { SettingsJobTitleDetailsComponent } from './components/settings/settings-job-titles/settings-job-title-details/settings-job-title-details.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { RequisitionDetailsComponent } from './components/job-details/requisition-details/requisition-details.component';
import { AdditionalDetailsComponent } from './components/job-details/additional-details/additional-details.component';
import { CompensationDetailsComponent } from './components/job-details/compensation-details/compensation-details.component';
import { ScreeningDetailsComponent } from './components/job-details/screening-details/screening-details.component';
import { EditorModule } from 'primeng/editor';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { TreeSelectModule } from 'primeng/treeselect';
import { BlockUIModule } from 'primeng/blockui';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RatingModule } from 'primeng/rating';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { OneWayInterviewComponent } from './components/job-details/one-way-interview/one-way-interview.component';
import { CoreModule } from 'src/app/core/core.module';
import { PostJobComponent } from './components/job-details/post-job/post-job.component';
import { ScreeningCategoriesComponent } from './components/screening/screening-categories/screening-categories.component';
import { ScreeningQuestionsComponent } from './components/screening/screening-questions/screening-questions.component';
import { ScreeningQuestionDetailsComponent } from './components/screening/screening-questions/screening-question-details/screening-question-details.component';
import { ScreeningCategoryDetailsComponent } from './components/screening/screening-categories/screening-category-details/screening-category-details.component';
import { QuestionDetailsComponent } from './components/job-details/screening-details/question-details/question-details.component';
import { ChipsModule } from 'primeng/chips';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { SettingAccountManagementComponent } from './components/settings/setting-account-management/setting-account-management.component';
import { OneWayInterviewModule } from 'src/app/internal-modules';
import { RequisitionModule } from 'src/app/internal-modules/requisition/requisition.module';
import { AddJobTitleCategoryComponent } from './components/settings/settings-job-titles/settings-job-title-details/add-job-title-category/add-job-title-category.component';
import { AddJobTitleComponent } from './components/settings/settings-job-titles/settings-job-title-details/add-job-title/add-job-title.component';
import { AddAssociatedJobsComponent } from './components/settings/settings-job-titles/settings-job-title-details/add-associated-jobs/add-associated-jobs.component';
@NgModule({
  declarations: [
    JobpostComponent,
    SettingsComponent,
    DashboardComponent,
    JobsPendingComponent,
    JobsActiveComponent,
    JobsInactiveComponent,
    SettingsJobTitlesComponent,
    SettingsInterviewQuestionsComponent,
    SettingsJobTitleDetailsComponent,
    JobDetailsComponent,
    RequisitionDetailsComponent,
    AdditionalDetailsComponent,
    CompensationDetailsComponent,
    ScreeningDetailsComponent,
    OneWayInterviewComponent,
    PostJobComponent,
    ScreeningCategoriesComponent,
    ScreeningQuestionsComponent,
    ScreeningQuestionDetailsComponent,
    ScreeningCategoryDetailsComponent,
    QuestionDetailsComponent,
    SettingAccountManagementComponent,
    AddJobTitleCategoryComponent,
    AddJobTitleComponent,
    AddAssociatedJobsComponent
  ],
  imports: [
    CommonModule,
    JobpostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    StepsModule,
    ToastModule,
    CardModule,
    DynamicDialogModule,
    RatingModule,
    EditorModule,
    AutoCompleteModule,
    DropdownModule,
    PanelModule,
    FileUploadModule,
    TreeSelectModule,
    BlockUIModule,
    SharedModule,
    OneWayInterviewModule,
    EditorModule,
    CoreModule,
    ChipsModule,
    LayoutModule,
    RequisitionModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class JobpostModule { }
