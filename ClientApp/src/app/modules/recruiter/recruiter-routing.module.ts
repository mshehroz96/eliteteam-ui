import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CandidatesDBComponent } from './components/candidatesdb/candidatesdb.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MainSettingComponent } from './components/main-setting/main-setting.component';
import { JobsActiveComponent } from './components/jobs-active/jobs-active.component';
import { JobDetailsComponent } from './components/jobs-active/job-details/job-details.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RecruiterShowcaseComponent } from './components/recruiter-showcase/recruiter-showcase.component';
import { RecruiterShowcaseViewComponent } from './components/recruiter-showcase-view/recruiter-showcase-view.component';
import { CandidateProfileComponent } from './components/candidatesdb/components/candidate-profile/candidate-profile.component';
import { JoinLiveInterviewComponent } from './components/join-live-interview/join-live-interview.component';
import { JobsActive2Component } from './components/jobs-active2/jobs-active2.component';
import { JobDetails2Component } from './components/jobs-active2/job-details2/job-details2.component';
const routes: Routes = [
  {
    path: '',
    component: RecruiterComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'live-interview/:id/:eventId/:requestId',
        component: JoinLiveInterviewComponent,
        pathMatch: "full"
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        pathMatch: "full"
      },
      {
        path: 'main-setting',
        component: MainSettingComponent,
        pathMatch: "full"
      },
      {
        path: 'candidates',
        component: CandidatesDBComponent,
        pathMatch: "full"
      },
      {
        path: 'applicant-profile/:id/:index',
        component: ApplicantProfileComponent,
        pathMatch: "full"
      },
      {
        path: 'jobs-active',
        component: JobsActiveComponent,
        pathMatch: "full"
      },
      {
        path : 'jobs-active2',
        component : JobsActive2Component,
        pathMatch : 'full'
      },
      {
        path: 'jobs-active/job-details/:id',
        component: JobDetailsComponent,
        pathMatch: "full"
      },
      {
         path : 'job-details2/:id',
         component : JobDetails2Component,
        pathMatch : 'full'
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch: "full"
      },
      {
        path: 'recruiter-showcase',
        component: RecruiterShowcaseComponent,
        pathMatch:"full"
      },
      {
        path: 'recruiter-showcase-view/:id',
        component: RecruiterShowcaseViewComponent,
        pathMatch: "full"
      },
      {
        path: 'candidates/candidate-profile/:candidateUserID/:CandidateCVId',
        component: CandidateProfileComponent,
        pathMatch: "full"
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class RecruiterRoutingModule { }
