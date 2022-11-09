import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AsideMenuComponent,
    NavMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ImageModule,
    RouterModule
  ],
  exports: [
    AsideMenuComponent,
    NavMenuComponent,
    FooterComponent
  ]

})
export class LayoutModule { }
