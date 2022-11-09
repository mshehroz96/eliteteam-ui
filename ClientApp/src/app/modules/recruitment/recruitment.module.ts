import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { RecruitmentComponent } from './recruitment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsUnassignedComponent } from './components/clients/clients-unassigned/clients-unassigned.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsAssignedComponent } from './components/clients/clients-assigned/clients-assigned.component';
import { RecruiterAssignmentDetailsComponent } from './components/clients/recruiter-assignment-details/recruiter-assignment-details.component';
import {ImageModule} from 'primeng/image';
import {DropdownModule} from 'primeng/dropdown';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { SettingsComponent } from './components/settings/settings.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {CheckboxModule} from 'primeng/checkbox';
import { RecruitersComponent } from './components/recruiters/recruiters.component';
import { RecruiterProfileComponent } from './components/recruiters/recruiter-profile/recruiter-profile.component';
import { RecruiterOverviewComponent } from './components/recruiters/recruiter-overview/recruiter-overview.component';
import { StatsOverviewComponent } from './components/recruiters/recruiter-profile/stats-overview/stats-overview.component';
import { RecruiterJobsComponent } from './components/recruiters/recruiter-profile/recruiter-jobs/recruiter-jobs.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RecruiterActiveJobsComponent } from './components/recruiters/recruiter-profile/recruiter-active-jobs/recruiter-active-jobs.component';
import { RecruiterInactiveJobsComponent } from './components/recruiters/recruiter-profile/recruiter-inactive-jobs/recruiter-inactive-jobs.component';
import { AddExpertiesComponentComponent } from './components/recruiters/recruiter-profile/add-experties-component/add-experties-component.component';
import { ReAssignRequisitionRecruitersComponent } from './components/recruiters/recruiter-profile/re-assign-requisition-recruiters/re-assign-requisition-recruiters.component';
import { ReAssignRequisitionRecruitersClientsComponent } from './components/recruiters/recruiter-profile/re-assign-requisition-recruiters-clients/re-assign-requisition-recruiters-clients.component';
import { ReAssignRequisitionRecruitersJobsComponent } from './components/recruiters/recruiter-profile/re-assign-requisition-recruiters-jobs/re-assign-requisition-recruiters-jobs.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RecruiterRequisitionDetailsComponent } from './components/recruiters/recruiter-profile/recruiter-requisition-details/recruiter-requisition-details.component';
import { CustomDatePipe } from 'src/app/core/pipe';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    RecruitmentComponent,
    DashboardComponent,
    ClientsUnassignedComponent,
    ClientsComponent,
    ClientsAssignedComponent,
    RecruiterAssignmentDetailsComponent,
    RecruitersComponent,
    RecruiterProfileComponent,
    RecruiterOverviewComponent,
    StatsOverviewComponent,
    RecruiterJobsComponent,
    RecruiterActiveJobsComponent,
    RecruiterInactiveJobsComponent,
    SettingsComponent,
    AddExpertiesComponentComponent,
    ReAssignRequisitionRecruitersComponent,
    ReAssignRequisitionRecruitersClientsComponent,
    ReAssignRequisitionRecruitersJobsComponent,
    RecruiterRequisitionDetailsComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TableModule,
    MultiSelectModule,
    CalendarModule,
    ImageModule,
    DropdownModule,
    CoreModule,
    LayoutModule,
    CascadeSelectModule,
    CheckboxModule,
    SharedModule,
    AutoCompleteModule,FullCalendarModule,
    TooltipModule,
  ],
  providers: [
    DatePipe,
    CustomDatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class RecruitmentModule { }
