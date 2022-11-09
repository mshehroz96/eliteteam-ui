import { VisitorModule } from './modules/visitor/visitor.module';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AdminModule } from './modules/admin/admin.module';
import { RecruiterModule } from './modules/recruiter/recruiter.module';
import { AuthModule } from './modules/auth/auth.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    RecruiterModule,
    RecruitmentModule,
    AdminModule,
    AuthModule,
    VisitorModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
