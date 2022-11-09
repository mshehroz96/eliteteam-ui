import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user/user';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  id: number = 0;
  userDetailData: User;
  userTimeLine: any;
  selected: string ='Account';
  selfSetting=false;
  activities:any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userDetailData = new User();
  }

  ngOnInit(): void {

    this.id =
      this.route.snapshot.paramMap.get('id') == null
        ? 0
        : Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUserDetail(this.id).subscribe((res: any) => {
      this.userDetailData = res.data;
    });

    this.userService.getUserTimeline(this.id).subscribe((res: any) => {
      this.userTimeLine = res.data;
      //console.log( this.userDetailData);
    });
    this.getUserActivities();
  }
  getUserActivities() {
    this.userService.getUserActivities(this.id).subscribe((res: any) => {
      if (res?.success) {
        this.activities = res?.data;
        this.activities = this.activities.filter(n => n.activity)
        this.activities = this.activities.slice(0, 10);
      }
    });
  }
  select(item: string) {
    this.selected = item;
  }
  isActive(item: string) {
    return ['nav-link', this.selected === item ? 'active' : ''];
  }
}
