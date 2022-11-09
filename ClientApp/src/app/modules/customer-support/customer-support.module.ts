import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSupportComponent } from './customer-support.component';
import { CustomerSupportHelpComponent } from './customer-support-help/customer-support-help.component';
import { CustomerSupportFaqsComponent } from './customer-support-faqs/customer-support-faqs.component';
import { CustomerSupportRoutingModule } from './customer-support-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerSupportRoutingModule
  ],
  declarations: [
    CustomerSupportComponent,
    CustomerSupportHelpComponent,
    CustomerSupportFaqsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CustomerSupportModule { }
