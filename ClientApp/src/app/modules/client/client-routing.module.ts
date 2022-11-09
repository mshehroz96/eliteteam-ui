import { CandidateprofileComponent } from './components/showcaseview/candidateprofile/candidateprofile.component';
import { ClientCalendarComponent } from './components/client-calendar/client-calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobDetailsComponent } from './components/jobs/job-details/job-details.component';
import { JobRequestComponent } from './components/jobs/job-request/job-request.component';
import { RequisitionDetailsComponent } from './components/jobs/job-request/requisition-details/requisition-details.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JoinMeetingComponent } from './components/join-meeting/join-meeting.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ClientUserManagementDetailsComponent } from './components/settings/client-user-management/client-user-management-details/client-user-management-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import { ShowcaseviewComponent } from './components/showcaseview/showcaseview.component';
import { JoinLiveInterviewComponent } from './components/join-live-interview/join-live-interview.component';
import { MeetInpersonInterviewComponent } from './components/meet-inperson-interview/meet-inperson-interview.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch:"full"
      },
      {
        path: 'jobs',
        component: JobsComponent,
        pathMatch: "full",
      },
      {
        path: 'jobs/job-request/:id',
        component: JobRequestComponent,
        pathMatch: "full"
      },
      {
        path: 'jobs/job-request/:id/:action',
        component: JobRequestComponent,
        pathMatch: 'full'
      },
      {
        path: 'jobs/job-details/:id',
        component: JobDetailsComponent,
        pathMatch: "full"
      },
      {
        path: 'settings',
        component: SettingsComponent,
        pathMatch:"full"
      },
      {
        path: 'showcase',
        component: ShowcaseComponent,
        pathMatch:"full"
      },
      {
        path: 'showcase-view/:id',
        component: ShowcaseviewComponent,
        pathMatch: "full"
      },
      {
        path: 'candidate-profile/:id/:index',
        component: CandidateProfileComponent,
        pathMatch: "full"
      },
      {
        path: 'candidate-profile/:id/:index',
        component: CandidateProfileComponent,
        pathMatch: "full"
      },
      {
        path: 'userDetail/:id',
        component: ClientUserManagementDetailsComponent,
        pathMatch: "full"
      },
      {
        path: 'join-meeting/:id',
        component: JoinMeetingComponent,
        pathMatch: "full"
      },
      {
        path: 'live-interview/:id/:eventId/:requestId',
        component: JoinLiveInterviewComponent,
        pathMatch: "full"
      },
      {
        path: 'inperson-interview/:id/:eventId/:requestId',
        component: MeetInpersonInterviewComponent,
        pathMatch: "full"
      },
      {
        path: 'client-calendar',
        component: ClientCalendarComponent,
        pathMatch: "full"
      },
      {
        path: 'showcaseview/candidate-profile/:id',
        component: CandidateprofileComponent,
        pathMatch: "full"
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
