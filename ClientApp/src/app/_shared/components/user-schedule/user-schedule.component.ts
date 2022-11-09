import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent implements OnInit {
  events: any[] = [];
  options: any;
  header: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
