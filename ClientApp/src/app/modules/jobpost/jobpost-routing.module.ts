import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobsActiveComponent } from './components/jobs-active/jobs-active.component';
import { JobsInactiveComponent } from './components/jobs-inactive/jobs-inactive.component';
import { JobsPendingComponent } from './components/jobs-pending/jobs-pending.component';
import { SettingsInterviewQuestionsComponent } from './components/settings/settings-interview-questions/settings-interview-questions.component';
import { SettingsJobTitleDetailsComponent } from './components/settings/settings-job-titles/settings-job-title-details/settings-job-title-details.component';
import { SettingsJobTitlesComponent } from './components/settings/settings-job-titles/settings-job-titles.component';
import { SettingsComponent } from './components/settings/settings.component';
import { JobpostComponent } from './jobpost.component';

const routes: Routes = [
  {
    path: '',
    component: JobpostComponent,
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
        path: 'jobs-pending',
        component: JobsPendingComponent,
        pathMatch: "full"
      },
      {
        path: 'job-details/:id',
        component: JobDetailsComponent,
        pathMatch: "full"
      },
      {
        path: 'jobs-active',
        component: JobsActiveComponent,
        pathMatch: "full"
      },
      {
        path: 'jobs-inactive',
        component: JobsInactiveComponent,
        pathMatch: "full"
      },
      {
        path: 'settings',
        component: SettingsComponent,
        pathMatch: "full"
      },
      {
        path: 'settings/settings-job-titles',
        component: SettingsJobTitlesComponent,
        pathMatch: "full"
      },
      {
        path: 'settings/settings-interview-questions',
        component: SettingsInterviewQuestionsComponent,
        pathMatch: "full"
      },
      {
        path: 'settings/settings-job-title-details/:id',
        component: SettingsJobTitleDetailsComponent,
        pathMatch: "full"
      }
      ,
      {
        path: 'settings/:id',
        component: SettingsComponent,
        pathMatch: "full"
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class JobpostRoutingModule { }
