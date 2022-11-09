import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { BnNgIdleService } from 'bn-ng-idle';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { PushNotificationsService } from './_services/pushnotification/pushnotification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Elite-Team';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };

  constructor(
    private bnIdle: BnNgIdleService,
    private pushNotificationsService: PushNotificationsService,
    private readonly authenticationService:AuthenticationService)
    {}

  ngOnInit(): void {
    // this.bnIdle.startWatching(1200).subscribe((isTimedOut: boolean) => {
    //   if (isTimedOut) {
    //    this.authenticationService.logout();
    //   }
    // });
    
    this.pushNotificationsService.requestPermission();
  }
}
