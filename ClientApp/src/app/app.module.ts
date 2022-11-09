import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PushNotificationsService } from './_services';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule,
    PdfJsViewerModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [
    { provide: BnNgIdleService },
    { provide: PushNotificationsService },
    { provide: MessageService },
    { provide: DialogService },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
