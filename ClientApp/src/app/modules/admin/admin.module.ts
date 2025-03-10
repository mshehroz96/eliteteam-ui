import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MainSettingComponent } from './components/main-setting/main-setting.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import {TooltipModule} from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import {DragDropModule} from 'primeng/dragdrop';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { ListsComponent } from './components/list-management/lists/lists.component';
import { ListDetailsComponent } from './components/list-management/lists/list-details/list-details.component';
import { ListItemsComponent } from './components/list-management/list-items/list-items.component';
//import { ListItemDetailsComponent } from './components/list-management/list-items/list-item-details/list-item-details.component';
import { ChipsModule } from 'primeng/chips';
import { ListItemDetailsComponent } from './components/list-management/list-items/list-item-details/list-item-details.component';
import { ThresholdSettingsComponent } from './components/main-setting/threshold-settings/threshold-settings.component';
import { EditThresholdValuesComponent } from './components/main-setting/threshold-settings/edit-threshold-values/edit-threshold-values.component';
import { CalendarModule } from 'primeng/calendar';
import { CommunicationTemplatesComponent } from './components/main-setting/communication-templates/communication-templates.component';
import { AddUpdateCommunicationTemplatesComponent } from './components/main-setting/communication-templates/add-update-communication-templates/add-update-communication-templates.component';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { AddUpdateListComponent } from './components/list-management/lists/add-update-list/add-update-list.component';
import {ListboxModule} from 'primeng/listbox';
import { PlanSettingsComponent } from './components/main-setting/plan-settings/plan-settings.component';
import { AddUpdatePlanComponent } from './components/main-setting/plan-settings/add-update-plan/add-update-plan.component';
import { OwitSettingsComponent } from './components/main-setting/owit-settings/owit-settings.component';
import { AddUpdateOwitComponent } from './components/main-setting/owit-settings/add-update-owit/add-update-owit.component';
import { OfferLetterTemplatesSettingsComponent } from './components/main-setting/offer-letter-templates-settings/offer-letter-templates-settings.component';
import { AddUpdateOfferLetterTemplateComponent } from './components/main-setting/offer-letter-templates-settings/add-update-offer-letter-template/add-update-offer-letter-template.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedSettingsPersonal2Component } from 'src/app/_shared/shared-settings-personal2/shared-settings-personal2.component';
import { List2Component } from './components/list-management2/list2/list2.component';
import { Listitem2Component } from './components/list-management2/listitem2/listitem2.component';
import { AddUpdateList2Component } from './components/list-management2/list2/add-update-list2/add-update-list2.component';
import { AddUpdateListitem2Component } from './components/list-management2/listitem2/add-update-listitem2/add-update-listitem2.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsersComponent,
    MainSettingComponent,
    PricingComponent,
    UserDetailComponent,
    ListsComponent,
    ListDetailsComponent,
    ListItemsComponent,
    ListItemDetailsComponent,
    ThresholdSettingsComponent,
    EditThresholdValuesComponent,
    CommunicationTemplatesComponent,
    AddUpdateCommunicationTemplatesComponent,
    AddUpdateListComponent,
    PlanSettingsComponent,
    AddUpdatePlanComponent,
    OwitSettingsComponent,
    AddUpdateOwitComponent,
    OfferLetterTemplatesSettingsComponent,
    AddUpdateOfferLetterTemplateComponent,
    List2Component,
    Listitem2Component,
    AddUpdateList2Component,
    AddUpdateListitem2Component
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    TableModule,
    MultiSelectModule,
    CoreModule,
    LayoutModule,
    ChipsModule,
    TooltipModule,
    DragDropModule,
    CalendarModule,
    EditorModule,
    DropdownModule,
		ListboxModule,
    AutoCompleteModule
    // SharedSettingsPersonal2Component
  ],

})
export class AdminModule {}
