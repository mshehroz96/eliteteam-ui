import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SettingsComponent } from './components/settings/settings.component';
import {ShowcaseComponent} from './components/showcase/showcase.component';
import {ShowcaseviewComponent} from './components/showcaseview/showcaseview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import {ImageModule} from 'primeng/image';
import { CardModule } from 'primeng/card';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobRequestComponent } from './components/jobs/job-request/job-request.component';
import { RequisitionDetailsComponent } from './components/jobs/job-request/requisition-details/requisition-details.component';
import { AdditionalDetailsComponent } from './components/jobs/job-request/additional-details/additional-details.component';
import { CompensationDetailsComponent } from './components/jobs/job-request/compensation-details/compensation-details.component';
import { ScreeningDetailsComponent } from './components/jobs/job-request/screening-details/screening-details.component';
import { ReviewDetailsComponent } from './components/jobs/job-request/review-details/review-details.component';
import { GetStartedComponent } from './components/jobs/job-request/get-started/get-started.component';
import { JobFeedbackComponent } from './components/jobs/job-feedback/job-feedback.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { BlockUIModule } from 'primeng/blockui';
import { MessageModule } from 'primeng/message';
import { SharedModule } from 'src/app/_shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import {PaginatorModule} from 'primeng/paginator';
import { LayoutModule } from 'src/app/_layout/layout.module';
import {DialogModule} from 'primeng/dialog';
import { SettingBillingDetailsComponent } from './components/settings/setting-billing-details/setting-billing-details.component';
import { SettingDataManagementComponent } from './components/settings/setting-data-management/setting-data-management.component';
import { SettingAccountManagementComponent } from './components/settings/setting-account-management/setting-account-management.component';
import { CompanyDetailsComponent } from './components/settings/setting-account-management/company-details/company-details.component';
import { RequisitionModule } from 'src/app/internal-modules/requisition/requisition.module';
import { JobDetailsComponent } from './components/jobs/job-details/job-details.component';
import { RecruitmentProcessModule } from 'src/app/internal-modules/recruitment-process/recruitment-process.module';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { ChatModule } from 'src/app/internal-modules/chat/chat.module';
import { ClientUserManagementComponent } from './components/settings/client-user-management/client-user-management.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ClientUserManagementDetailsComponent } from './components/settings/client-user-management/client-user-management-details/client-user-management-details.component';
import { JoinMeetingComponent } from './components/join-meeting/join-meeting.component';
import { ClientCalendarComponent } from './components/client-calendar/client-calendar.component';
import { OfferLetterTemplatesComponent } from './components/settings/setting-data-management/offer-letter-templates/offer-letter-templates.component';
import { AddUpdateOfferLetterTemplatesComponent } from './components/settings/setting-data-management/offer-letter-templates/add-update-offer-letter-templates/add-update-offer-letter-templates.component';
import { CandidateprofileComponent } from './components/showcaseview/candidateprofile/candidateprofile.component';
import { JoinLiveInterviewComponent } from './components/join-live-interview/join-live-interview.component';
import { MeetInpersonInterviewComponent } from './components/meet-inperson-interview/meet-inperson-interview.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
  declarations: [
    ClientComponent,
    MessagesComponent,
    SettingsComponent,
    JobsComponent,
    JobRequestComponent,
    RequisitionDetailsComponent,
    AdditionalDetailsComponent,
    CompensationDetailsComponent,
    ScreeningDetailsComponent,
    ReviewDetailsComponent,
    GetStartedComponent,
    JobFeedbackComponent,
    ShowcaseComponent,
    ShowcaseviewComponent,
    SettingBillingDetailsComponent,
    SettingDataManagementComponent,
    SettingAccountManagementComponent,
    CompanyDetailsComponent,
    JobDetailsComponent,
    CandidateProfileComponent,
    ClientUserManagementComponent,
    ClientUserManagementDetailsComponent,
    JoinMeetingComponent,
    ClientCalendarComponent,
    OfferLetterTemplatesComponent,
    AddUpdateOfferLetterTemplatesComponent,
    CandidateprofileComponent,
    JoinLiveInterviewComponent,
    MeetInpersonInterviewComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    ClientRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
    ToastModule,
    ImageModule,
    CardModule,
    DynamicDialogModule,
    RatingModule,
    EditorModule,
    AutoCompleteModule,
    DropdownModule,
    PanelModule,
    FileUploadModule,
    BlockUIModule,
    CoreModule,
    SharedModule,
    MessageModule,
    SplitButtonModule,
    PaginatorModule,
    LayoutModule,
    DialogModule,
    ChatModule,
    RadioButtonModule,
    RecruitmentProcessModule,
    RequisitionModule,
    RouterModule,
    MatFormFieldModule,
    PdfJsViewerModule,
    HttpClientModule,
    InputMaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ClientModule { }
