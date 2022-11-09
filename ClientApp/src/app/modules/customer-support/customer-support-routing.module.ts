
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSupportFaqsComponent } from './customer-support-faqs/customer-support-faqs.component';
import { CustomerSupportHelpComponent } from './customer-support-help/customer-support-help.component';
import { CustomerSupportComponent } from './customer-support.component';

const routes: Routes = [
    {
      path: '',
      component: CustomerSupportComponent,
      children: [
        {
            path: '/customer-support/help',
            component: CustomerSupportHelpComponent,
            pathMatch:"full"
        },
        {
          path: 'faqs',
          component: CustomerSupportFaqsComponent,
          pathMatch: "full"
        }
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class CustomerSupportRoutingModule {}