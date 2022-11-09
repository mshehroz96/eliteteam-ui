import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ServererrorComponent } from './components/servererror/servererror.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path: '404',
        component: NotfoundComponent,
      },
      {
        path: '500',
        component: ServererrorComponent,
      },
      {
        path: '401',
        component: UnauthorizedComponent,
      },
      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule { }
