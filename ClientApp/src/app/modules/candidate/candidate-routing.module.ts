import { MyJobsComponent } from './component/my-jobs/my-jobs.component';
import { OnewayInterviewCompletedComponent } from './component/oneway-interview-completed/oneway-interview-completed.component';
import { CandidateInterviewComponent } from './component/candidate-interview/candidate-interview.component';
import { SettingAccountComponent } from './../candidate/component/setting-account/setting-account.component';
import { MessagesComponent } from './../candidate/component/messages/messages.component';
import { MyprofileComponent } from './../candidate/component/myprofile/myprofile.component';
import { DashboardComponent } from './../candidate/component/dashboard/dashboard.component';
import { CandidateComponent } from './candidate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateInterviewStartedComponent } from './component/candidate-interview-started/candidate-interview-started.component';
import { CandidateJobDetailComponent } from './component/candidate-job-detail/candidate-job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch: "full"
      },
      {
        path: 'myprofile',
        component: MyprofileComponent,
        pathMatch: "full"
      },
      {
        path: 'setting-account',
        component: SettingAccountComponent,
        pathMatch: "full"
      },
      {
        path: 'one-way-interview/:requisitionUUID/:requisitionCandidateID',
        component: CandidateInterviewComponent,
        pathMatch: "full"
      },
      {
        path: 'one-way-interview',
        component: CandidateInterviewComponent,
        pathMatch: "full"
      },
      {
        path: 'one-way-interview-started/:requisitionUUID/:requisitionCandidateID/:requisitionInterviewRequestId',
        component: CandidateInterviewStartedComponent,
        pathMatch: "full"
      },
      {
        path: 'one-way-interview-started',
        component: CandidateInterviewStartedComponent,
        pathMatch: "full"
      },
      {
        path: 'candidate-job-detail/:requisitionUUID/:requisitionCandidateID',
        component: CandidateJobDetailComponent,
        pathMatch: "full"
      },
      {
        path: 'oneway-interview-completed',
        component: OnewayInterviewCompletedComponent,
        pathMatch: "full"
      },
      {
        path: 'my-jobs',
        component: MyJobsComponent,
        pathMatch: "full"
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
