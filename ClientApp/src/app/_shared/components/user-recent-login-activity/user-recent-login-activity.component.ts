import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-user-recent-login-activity',
  templateUrl: './user-recent-login-activity.component.html',
  styleUrls: ['./user-recent-login-activity.component.css']
})
export class UserRecentLoginActivityComponent implements OnInit {

  _userId:number=0;
  @Input('userId') set userId(value:number)
  {
    this._userId=value;
    
    this.getUserRecentLoginActivity();
  }

  get userId()
  {
    return this._userId;
  }

  activityList:any[]=[];
  private activities: any[] = [];
  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;
  constructor(private userService:UserService) { }

  ngOnInit() {

  }

  getUserRecentLoginActivity(){
    this.userService.getUserLoginActivities(this.userId).subscribe((res)=>
    {
        if(res.success)
        {
          console.log(res.data);
          
          this.activities =res.data;
          this.totalRecords = this.activities.length;
          this.activityList = this.activities.slice(this.first, (this.first + this.rows));
        }
    })
  }

  pageChange(event: any) {
    this.activityList = this.activities.slice(event.first, (event.first + event.rows));
  }

}
