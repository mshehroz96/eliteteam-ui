import { ExternalShowcaseComponent } from './external-showcase/external-showcase.component';
import { VisitorComponent } from './visitor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalCandidateProfileComponent } from './external-candidate-profile/external-candidate-profile.component';

const routes: Routes = [
  {
    path: '',
    // component: VisitorComponent,
    children: [
      {
        path: 'show-case/:id',
        component: ExternalShowcaseComponent,
      },
      {
        path: 'candidate-external-profile/:id/:title',
        component: ExternalCandidateProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
