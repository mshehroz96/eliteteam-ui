import { RecruiterShowcaseComponent } from './../recruiter/components/recruiter-showcase/recruiter-showcase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsAssignedComponent } from './components/clients/clients-assigned/clients-assigned.component';
import { ClientsUnassignedComponent } from './components/clients/clients-unassigned/clients-unassigned.component';
import { ClientsComponent } from './components/clients/clients.component';
import { RecruiterAssignmentDetailsComponent } from './components/clients/recruiter-assignment-details/recruiter-assignment-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecruiterProfileComponent } from './components/recruiters/recruiter-profile/recruiter-profile.component';
import { RecruitersComponent } from './components/recruiters/recruiters.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RecruitmentComponent } from './recruitment.component';
import { RecruiterShowcaseViewComponent } from '../recruiter/components/recruiter-showcase-view/recruiter-showcase-view.component';

const routes: Routes = [
  {
    path: '',
    component: RecruitmentComponent,
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
        path: 'settings',
        component: SettingsComponent,
        pathMatch: "full"
      },
      {
        path: 'clients',
        component: ClientsComponent,
        pathMatch: "full"
      },
      {
        path: 'recruiters',
        component: RecruitersComponent,
        pathMatch: "full"
      },
      {
        path: 'clients-unassigned',
        component: ClientsUnassignedComponent,
        pathMatch: "full"
      },
      {
        path: 'clients-assigned',
        component: ClientsAssignedComponent,
        pathMatch: "full"
      },
        {
        path: 'clients/recruiter-assignment-details/:id',
        component: RecruiterAssignmentDetailsComponent,
        pathMatch: "full"
      }
      ,
      {
        path: 'recruiters',
        component: RecruitersComponent,
        pathMatch: "full"
      },
      {
        path: 'recruiters/recruiter-profile/:id',
        component: RecruiterProfileComponent,
        pathMatch: "full"
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
