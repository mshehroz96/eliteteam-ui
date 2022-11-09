import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'visitor',
    loadChildren: () =>
      import('./modules/visitor/visitor.module').then((m) => m.VisitorModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'recruiter',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/recruiter/recruiter.module').then((m) => m.RecruiterModule)
  },
  {
    path: 'recruitment',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/recruitment/recruitment.module').then((m) => m.RecruitmentModule)
  },
  {
    path: 'jobpost',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/jobpost/jobpost.module').then((m) => m.JobpostModule)
  },
  {
    path: 'client',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('./modules/candidate/candidate.module').then((m) => m.CandidateModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'candidate',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/candidate/candidate.module').then((m) => m.CandidateModule),
  },
  { 
    path: '**', 
    redirectTo: 'error/404' 
  },
  {
    path: 'customer-support',
    loadChildren: () =>
      import('./modules/customer-support/customer-support.module').then((m) => m.CustomerSupportModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
