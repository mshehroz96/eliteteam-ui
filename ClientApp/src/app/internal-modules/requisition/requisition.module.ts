import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisitionSummaryComponent } from './components/requisition-summary/requisition-summary.component';
import { RequisitionRecruitersViewComponent } from './components/requisition-recruiters-view/requisition-recruiters-view.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    RequisitionSummaryComponent,
    RequisitionRecruitersViewComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[
    RequisitionSummaryComponent,
    RequisitionRecruitersViewComponent
  ]
})
export class RequisitionModule { }
