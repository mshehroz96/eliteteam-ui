import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Children } from 'preact/compat';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainSettingComponent } from './components/main-setting/main-setting.component';
import { PlanSettingsComponent } from './components/main-setting/plan-settings/plan-settings.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UsersComponent } from './components/users/users.component';
import { User2Component } from './components/user2/user2.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: "full",
      },  
      {
        path: 'users2',
        component: User2Component,
        pathMatch: "full",
      },
      {
        path: 'main-setting',
        component: MainSettingComponent,
        pathMatch: "full"
      },
      {
        path: 'userDetail/:id',
        component: UserDetailComponent,
        pathMatch: "full"
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
