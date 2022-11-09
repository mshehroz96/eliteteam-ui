import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProspectClientRoutingModule } from './prospect-client-routing.module';
import { ProspectClientComponent } from './prospect-client.component';


@NgModule({
  declarations: [
    ProspectClientComponent
  ],
  imports: [
    CommonModule,
    ProspectClientRoutingModule
  ]
})
export class ProspectClientModule { }
