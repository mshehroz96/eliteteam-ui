import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorRoutingModule } from './visitor-routing.module';
import { VisitorComponent } from './visitor.component';
import { LayoutModule } from 'src/app/_layout/layout.module';
import { CoreModule } from 'src/app/core/core.module';
import { ExternalShowcaseComponent } from './external-showcase/external-showcase.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ExternalCandidateProfileComponent } from './external-candidate-profile/external-candidate-profile.component';
import {BlockUIModule} from 'primeng/blockui';
import {DialogModule} from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
@NgModule({
  declarations: [
    VisitorComponent,
    ExternalShowcaseComponent,
    ExternalCandidateProfileComponent
  ],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    AuthRoutingModule,
    CoreModule,
    BlockUIModule,
    DialogModule,
    DynamicDialogModule,
    PdfJsViewerModule
  ]
})
export class VisitorModule { }
