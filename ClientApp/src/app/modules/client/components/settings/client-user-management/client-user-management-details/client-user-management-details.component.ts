import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user/user';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-client-user-management-details',
  templateUrl: './client-user-management-details.component.html',
  styleUrls: ['./client-user-management-details.component.css']
})
export class ClientUserManagementDetailsComponent implements OnInit {
  id: number = 0;
  userDetailData: User;
  userTimeLine: any;
  selected: string ='Account';
  selfSetting=false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userDetailData = new User();
  }
  
  ngOnInit(): void {

    this.id =
      this.route.snapshot.paramMap.get('id') == null
        ? 0
        : Number(this.route.snapshot.paramMap.get('id'));

    this.loadData(null);
  }

  loadData(result:any){
    this.userService.getUserDetail(this.id).subscribe((res: any) => {
      this.userDetailData = res.data;
    });

    this.userService.getUserTimeline(this.id).subscribe((res: any) => {
      this.userTimeLine = res.data;
      //console.log( this.userDetailData);
    });
  }
  select(item: string) {
    this.selected = item;
  }
  isActive(item: string) {
    return ['nav-link', this.selected === item ? 'active' : ''];
  }
}
