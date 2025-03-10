import { CUSTOM_ELEMENTS_SCHEMA, NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../modules/admin/admin-routing.module';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SecurityComponent } from './security/security.component';
import { NotificationManageComponent } from './notification-manage/notification-manage.component';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableViewComponent } from './table-view/table-view.component';
import { DataTablesModule } from 'angular-datatables';
import { LayoutCardComponent } from './layout-card/layout-card.component';
import { CoreModule } from '../core/core.module';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvailabilityComponent } from './event-calendar/components/availability/availability.component';
import { ClientmeetingComponent } from './event-calendar/components/clientmeeting/clientmeeting.component';
import { UserActivityTimelineComponent } from './components/user-activity-timeline/user-activity-timeline.component';
import { UserActivitySummaryComponent } from './components/user-activity-summary/user-activity-summary.component';
import { UserScheduleComponent } from './components/user-schedule/user-schedule.component';
import { UserSpecializationComponent } from './components/user-specialization/user-specialization.component';
import { AvailabilityViewComponent } from './event-calendar/components/availability-view/availability-view.component';
import { BlockUIModule } from 'primeng/blockui';
import { ClientOverviewComponent } from './components/client-overview/client-overview.component';
import { ClientmeetingViewComponent } from './event-calendar/components/clientmeeting-view/clientmeeting-view.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import timeGridPlugin from '@fullcalendar/timegrid';
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

import { ImageModule } from 'primeng/image';
import { SettingsPersonalComponent } from './settings-personal/settings-personal.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { CandidateInterviewViewComponent } from './event-calendar/components/candidate-interview-view/candidate-interview-view.component';
import { SelectinterviewTimeComponent } from './selectinterview-time/selectinterview-time.component';
import { PaginatorModule } from 'primeng/paginator';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserOverviewDetailComponent } from './components/user-overview-detail/user-overview-detail.component';
import { CandidateStatsComponent } from './candidate-stats/candidate-stats.component';
import { UserPlanDetailsComponent } from './components/user-plan-details/user-plan-details.component';
import { CandidateJobsComponent } from './candidate-jobs/candidate-jobs.component';
import {InputMaskModule} from 'primeng/inputmask';

import {TooltipModule} from 'primeng/tooltip';
import { CommonclientComponent } from './commonclient/commonclient.component';
import { UserRecentLoginActivityComponent } from './components/user-recent-login-activity/user-recent-login-activity.component';
import { CandidateBasicInfoComponent } from './candidate-basic-info/candidate-basic-info.component';
import { CandidateDefaultInterviewComponent } from './candidate-default-interview/candidate-default-interview.component';
import { RecruiterSchedulesComponent } from './event-calendar/components/recruiter-schedules/recruiter-schedules.component';
import { SchedulesViewComponent } from './event-calendar/components/schedules-view/schedules-view.component';
import { DefaultOWIDetailComponent } from './default-owi-detail/default-owi-detail.component';
import { DefaultOWIAnswersComponent } from './default-owi-answers/default-owi-answers.component';
import { LockedResumeComponent } from './locked-resume/locked-resume.component';
import { UnlockedResumeComponent } from './unlocked-resume/unlocked-resume.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedSettingsPersonal2Component } from './shared-settings-personal2/shared-settings-personal2.component';


@NgModule({
  declarations: [
    SecurityComponent,
    NotificationManageComponent,
    CreateUpdateComponent,
    TableViewComponent,
    LayoutCardComponent,
    EventCalendarComponent,
    AvailabilityComponent,
    AvailabilityViewComponent,
    ClientmeetingComponent,
    UserActivityTimelineComponent,
    UserActivitySummaryComponent,
    UserScheduleComponent,
    UserSpecializationComponent,
    ClientOverviewComponent,
    ClientmeetingViewComponent,
    SettingsPersonalComponent,
    CandidateInterviewViewComponent,
    SelectinterviewTimeComponent,
    UserDetailComponent,
    UserOverviewDetailComponent,
    CandidateStatsComponent,
    UserPlanDetailsComponent,
    CandidateJobsComponent,
    CommonclientComponent,
    UserRecentLoginActivityComponent,
    CandidateBasicInfoComponent,
    CandidateDefaultInterviewComponent,
    RecruiterSchedulesComponent,
    SchedulesViewComponent,
    DefaultOWIDetailComponent,
    DefaultOWIAnswersComponent,
    LockedResumeComponent,
    UnlockedResumeComponent,
    PaymentComponent,
    SharedSettingsPersonal2Component
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ImageModule,
    ReactiveFormsModule,
    DataTablesModule,
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
    FileUploadModule,
    MultiSelectModule,
    PaginatorModule,
    TooltipModule,
    InputMaskModule,
    TableModule,
    RatingModule
  ],
  exports: [
    SecurityComponent,
    NotificationManageComponent,
    CreateUpdateComponent,
    TableViewComponent,
    LayoutCardComponent,
    SettingsPersonalComponent,
    EventCalendarComponent,
    AvailabilityComponent,
    AvailabilityViewComponent,
    ClientmeetingComponent,
    UserActivitySummaryComponent,
    UserActivityTimelineComponent,
    UserScheduleComponent,
    UserSpecializationComponent,
    AvailabilityViewComponent,
    ClientmeetingViewComponent,
    CandidateInterviewViewComponent,
    SelectinterviewTimeComponent,
    UserDetailComponent,
    UserOverviewDetailComponent,
    CandidateStatsComponent,
    UserPlanDetailsComponent,
    CandidateJobsComponent,
    CommonclientComponent,
    UserRecentLoginActivityComponent,
    CandidateBasicInfoComponent,
    CandidateDefaultInterviewComponent,
    DefaultOWIDetailComponent,
    DefaultOWIAnswersComponent,
    LockedResumeComponent,
    UnlockedResumeComponent,
    PaymentComponent,
    SharedSettingsPersonal2Component
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule { }
