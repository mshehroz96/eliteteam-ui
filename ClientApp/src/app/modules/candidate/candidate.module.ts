
import { BlockUIModule } from 'primeng/blockui';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MyprofileComponent } from './component/myprofile/myprofile.component';
import { MessagesComponent } from './component/messages/messages.component';
import { SettingAccountComponent } from './component/setting-account/setting-account.component';
import {ChartModule} from 'primeng/chart';
import {TabViewModule} from 'primeng/tabview';
import { CvComponent } from './component/myprofile/cv/cv.component';
import { PreferencesComponent } from './component/myprofile/preferences/preferences.component';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import { CandidateInterviewComponent } from './component/candidate-interview/candidate-interview.component';
import { CandidateInterviewStartedComponent } from './component/candidate-interview-started/candidate-interview-started.component';
import { CandidateJobDetailComponent } from './component/candidate-job-detail/candidate-job-detail.component';
import { ReviewOfferComponent } from './component/review-offer/review-offer.component';
import { ShareProfileComponent } from './component/myprofile/share-profile/share-profile.component';
import { VideoInterviewComponent } from './component/dashboard/component/video-interview/video-interview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnewayInterviewCompletedComponent } from './component/oneway-interview-completed/oneway-interview-completed.component';
import { ChatModule } from 'src/app/internal-modules/chat/chat.module';
import { MyJobsComponent } from './component/my-jobs/my-jobs.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { AddUpdatePersonalDetailsComponent } from './component/myprofile/cv/add-update-personal-details/add-update-personal-details.component';
import { TooltipModule } from 'primeng/tooltip';
import { AddUpdateAwardsComponent } from './component/myprofile/cv/add-update-awards/add-update-awards.component';
import { EditorModule } from 'primeng/editor';
import { AddUpdateWrkExpComponent } from './component/myprofile/cv/add-update-wrk-exp/add-update-wrk-exp.component';
import { AddUpdateEducationComponent } from './component/myprofile/cv/add-update-education/add-update-education.component';
import { AddUpdateCertificationsComponent } from './component/myprofile/cv/add-update-certifications/add-update-certifications.component';
import { AddUpdatePublicationsComponent } from './component/myprofile/cv/add-update-publications/add-update-publications.component';
import { AddUpdateReferencesComponent } from './component/myprofile/cv/add-update-references/add-update-references.component';


@NgModule({
  declarations: [
    CandidateComponent,
    DashboardComponent,
    MyprofileComponent,
    MessagesComponent,
    SettingAccountComponent,
    CvComponent,
    PreferencesComponent,
    CandidateInterviewComponent,
    CandidateInterviewStartedComponent,
    CandidateJobDetailComponent,
    ReviewOfferComponent,
    ShareProfileComponent,
    VideoInterviewComponent,
    OnewayInterviewCompletedComponent,
    MyJobsComponent,
    AddUpdatePersonalDetailsComponent,
    AddUpdateAwardsComponent,
    AddUpdateWrkExpComponent,
    AddUpdateEducationComponent,
    AddUpdateCertificationsComponent,
    AddUpdatePublicationsComponent,
    AddUpdateReferencesComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    LayoutModule,
    CoreModule,
    SharedModule,
    ChartModule,
    TabViewModule,
    DialogModule,
    CalendarModule,
    BlockUIModule,
    FormsModule,
    ChatModule,
    TableModule,
    MultiSelectModule,
    CommonModule,
    NgbModule,
    DropdownModule,
    CascadeSelectModule,
    CheckboxModule,
    AutoCompleteModule,FullCalendarModule,
    AdminRoutingModule,
    CoreModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    BlockUIModule,
    TooltipModule,
    ReactiveFormsModule,
    EditorModule,
    CommonModule,
    AdminRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    FullCalendarModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    BlockUIModule,
    AutoCompleteModule,
    CascadeSelectModule,
    DropdownModule,
    MultiSelectModule,
    TooltipModule,
    TableModule,
  ],
  exports:[
    DashboardComponent,
    CvComponent,
    PreferencesComponent,
    ReviewOfferComponent,
    ShareProfileComponent,
    VideoInterviewComponent,
    AddUpdatePersonalDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CandidateModule { }
