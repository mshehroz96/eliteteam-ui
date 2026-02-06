import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from 'src/app/_shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { MainSettingComponent } from './components/main-setting/main-setting.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RatingModule} from 'primeng/rating';
import {CalendarModule} from 'primeng/calendar';
import {BlockUIModule} from 'primeng/blockui';
import {PaginatorModule} from 'primeng/paginator';
import { CandidatesDBComponent } from './components/candidatesdb/candidatesdb.component';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { JobsActiveComponent } from './components/jobs-active/jobs-active.component';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { CoreModule } from 'src/app/core/core.module';
import { RecruitmentProcessModule } from 'src/app/internal-modules/recruitment-process/recruitment-process.module';
import { JobDetailsComponent } from './components/jobs-active/job-details/job-details.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
import { RequisitionModule } from 'src/app/internal-modules/requisition/requisition.module';
import { ChatModule } from 'src/app/internal-modules/chat/chat.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RecruiterSchedulesComponent } from './components/recruiter-schedules/recruiter-schedules.component';
import { RecruiterScheduleDetailsComponent } from './components/recruiter-schedules/recruiter-schedule-details/recruiter-schedule-details.component';
import { EditRecruiterScheduleComponent } from './components/recruiter-schedules/edit-recruiter-schedule/edit-recruiter-schedule.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RecruiterShowcaseComponent } from './components/recruiter-showcase/recruiter-showcase.component';
import { RecruiterShowcaseViewComponent } from './components/recruiter-showcase-view/recruiter-showcase-view.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TreeSelectModule} from 'primeng/treeselect';
import {ChipsModule} from 'primeng/chips';
import { CandidateProfileComponent } from './components/candidatesdb/components/candidate-profile/candidate-profile.component';
import { ZoomMeetingModule } from 'src/app/internal-modules/zoom-meeting/zoom-meeting.module';
import { AddUpdateRecruiterSchedulesComponent } from './components/recruiter-schedules/add-update-recruiter-schedules/add-update-recruiter-schedules.component';
import { JoinLiveInterviewComponent } from './components/join-live-interview/join-live-interview.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { JobsActive2Component } from './components/jobs-active2/jobs-active2.component';
import { JobDetails2Component } from './components/jobs-active2/job-details2/job-details2.component';
import { CandidateModule } from '../candidate/candidate.module';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [
    CalendarComponent,
    RecruiterComponent,
    DialogComponent,
    MainSettingComponent,
    CandidatesDBComponent,
    JobsActiveComponent,
    JobDetailsComponent,
    ApplicantProfileComponent,
    RecruiterSchedulesComponent,
    RecruiterScheduleDetailsComponent,
    EditRecruiterScheduleComponent,
    MessagesComponent,
    RecruiterShowcaseComponent,
    RecruiterShowcaseViewComponent,
    CandidateProfileComponent,
    JoinLiveInterviewComponent,
    AddUpdateRecruiterSchedulesComponent,
    JobsActive2Component,
    JobDetails2Component
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    FullCalendarModule, // register FullCalendar with you app
    MatBottomSheetModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    HttpClientModule,
    MatDialogModule,
    SharedModule,
    TableModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    AutoCompleteModule,
    RatingModule,
    CalendarModule,
    BlockUIModule,
    PaginatorModule,
    DialogModule,
    DynamicDialogModule,
    MultiSelectModule,
    CoreModule,
    LayoutModule,
    RecruitmentProcessModule,
    RequisitionModule,
    ChatModule,
    SplitButtonModule,
    TreeSelectModule,
    ChipsModule,
    ZoomMeetingModule,
    PdfJsViewerModule,
    DropdownModule,
    CandidateModule
  ],
})
export class RecruiterModule {}
