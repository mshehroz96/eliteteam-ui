import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-user-activity-timeline',
  templateUrl: './user-activity-timeline.component.html',
  styleUrls: ['./user-activity-timeline.component.css']
})
export class UserActivityTimelineComponent implements OnInit {

  @Input() userId : number = 0;
  // private activities:any[]=[];
  //private _activities:any[]=[];
  // @Input() set activities(values:any[]){
  //   this._activities=values;
  //   this.getActivityList();
  // };

  // get activities()
  // {
  //     return this._activities;
  // }

  first:number=1;
  rows:number=5;
  totalRecords:number=0;
  activityList!:any[];
  constructor(private service:UserService) { 
    // this.activityList=[];
  }
  
  ngOnInit(): void {
    this.getUserActivities();
  }
  getUserActivities(){
    this.service.getUserActivties(this.first,this.rows,this.userId).subscribe((res) => {
      this.activityList = res?.data;
      this.totalRecords = res?.totalRecords;
      //this.strImage = FILES_PATHS.MAP_USER_AVATARS(this.recruiterProfileDetail?.avatarFileName??"");
      
    });
  }
  // getActivityList()
  // {
  //   if (this.activities && this.activities.length > 0) {
  //     this.totalRecords = this.activities.length;
  //     this.activityList = this.activities.slice(this.first, (this.first + this.rows));
  //   }
  //   console.log(this.activities.length);
  // }
  pageChange(event:any)
  {
    this.first = event.page + 1;
    this.rows = event.rows;
    this.getUserActivities();
    // this.activityList = this.activities.slice(event.first, (event.first + event.rows));
  }
  getDate(date:any){
    return moment(date).fromNow();
  }
}
