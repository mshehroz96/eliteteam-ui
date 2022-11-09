import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ServererrorComponent } from './components/servererror/servererror.component';


@NgModule({
  declarations: [
    ErrorComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    ServererrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
