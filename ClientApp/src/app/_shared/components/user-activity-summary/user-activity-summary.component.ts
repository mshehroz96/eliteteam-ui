import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-activity-summary',
  templateUrl: './user-activity-summary.component.html',
  styleUrls: ['./user-activity-summary.component.css']
})
export class UserActivitySummaryComponent implements OnInit {
  @Input() summaries!:any[];
  constructor() { }
  sum?:number;
  ngOnInit(): void {
    const seconds = 3;
    setInterval(() => {
      this.findSum();
    }, seconds * 1000);
  }
  findSum(){
    let sum = 0;
    this.summaries.forEach((obj) => {
      sum += parseInt(obj.hoursCount);
    });
    this.sum = sum;
  }

}
