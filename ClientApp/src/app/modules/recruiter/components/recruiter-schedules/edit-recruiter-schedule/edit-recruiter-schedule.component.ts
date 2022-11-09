import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-recruiter-schedule',
  templateUrl: './edit-recruiter-schedule.component.html',
  styleUrls: ['./edit-recruiter-schedule.component.css']
})
export class EditRecruiterScheduleComponent implements OnInit {

  constructor() { }
  disableAll?:boolean = true;
  ngOnInit() {
  }
  enableEditing(){
    this.disableAll = false;
  }

}
