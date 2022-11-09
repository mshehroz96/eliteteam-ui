import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinMeetingComponent } from './components/join-meeting/join-meeting.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JoinMeetingComponent],
  exports:[
    JoinMeetingComponent,
  ]
})
export class ZoomMeetingModule { }
