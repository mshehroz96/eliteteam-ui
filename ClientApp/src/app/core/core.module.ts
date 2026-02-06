import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './handler/error/error.handler';
import { RequestInterceptor } from './interceptor/request/request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  SafeHtmlPipe,
  AvatarPipe,
  ElapsedTimePipe,
  JobStatusPipe,
  UserStatusPipe,
  UserRolePipe,
  CustomDatePipe,
  CustomDateTimePipe,
  OwiVideoPipe,ResumeLockedPipe,ResumeUnLockedPipe} from './pipe';
import { AllownumbersonlyDirective, FocusInvalidDirective,LoadingDirective } from './directive';
import { LoadingSpinnerComponent } from './directive/loading/loading-spinner/loading-spinner.component';
import { AppConfigDirective } from './directive/app-configuration/app-config.directive';
import { CompanyLogoPipe } from './pipe/company-logo/company-logo.pipe';
import { JobAttachmentPipe } from './pipe/requisition-attachment/job-attachment.pipe';
import { RecordStatusPipe } from './pipe/recordStatus/recordStatus.pipe';
import { CampaignTypePipe } from './pipe/campaign-type/campaign-type.pipe';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    AvatarPipe,
    ElapsedTimePipe,
    JobStatusPipe,
    UserStatusPipe,
    UserRolePipe,
    CustomDatePipe,
    CustomDateTimePipe,
    FocusInvalidDirective,
    AllownumbersonlyDirective,
    LoadingDirective,
    LoadingSpinnerComponent,
    AppConfigDirective,
    OwiVideoPipe,
    CompanyLogoPipe,
    JobAttachmentPipe,
    RecordStatusPipe,
    ResumeLockedPipe,
    ResumeUnLockedPipe,
    CampaignTypePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  exports:[
    SafeHtmlPipe,
    AvatarPipe,
    ElapsedTimePipe,
    JobStatusPipe,
    UserStatusPipe,
    UserRolePipe,
    CustomDatePipe,
    CustomDateTimePipe,
    FocusInvalidDirective,
    AllownumbersonlyDirective,
    LoadingDirective,
    LoadingSpinnerComponent,
    AppConfigDirective,
    OwiVideoPipe,
    CompanyLogoPipe,
    JobAttachmentPipe,
    RecordStatusPipe,
    ResumeLockedPipe,
    ResumeUnLockedPipe,
    CampaignTypePipe
  ]
})
export class CoreModule { }
