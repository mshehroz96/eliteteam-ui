import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public tabType: string = 'account';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string='Account';
  selfSetting=true;
  userDetailData:User;


  constructor(private route: ActivatedRoute) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    this.userDetailData = new User();
  }

  ngOnInit(): void {
    
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push({
      Name: 'Account',
      RouteName: 'account',
      Icon: 'bx bx-lock-alt me-1',
    });
    this.menuList.push({
      Name: 'Security',
      RouteName: 'security',
      Icon: 'bx bx-lock-alt me-1',
    });
    this.menuList.push({
      Name: 'Notifications',
      RouteName: 'notification',
      Icon: 'bx bx-bell me-1',
    });
    this.menuList.push({
      Name: 'Screening Question',
      RouteName: 'settings-screening-questions',
      Icon: 'bx bxs-category me-1',
    });
    this.menuList.push({
      Name: 'Interview Questions',
      RouteName: 'settings-interview-questions',
      Icon: 'bx bx-category me-1',
    });
    this.menuList.push({
      Name: 'Job Titles',
      RouteName: 'settings-job-titles',
      Icon: 'fa fa-briefcase me-1',
    });
    // if(this.route.snapshot.params['id'] && this.route.snapshot.params['id'] ==  '6'){
    //   this.tabType = 'settings-job-titles';
    //   this.selected = 'Job Titles';
    // }
  }

  loadTab(item: any, tabType: string, event:any) {
    event.preventDefault();
    if (tabType != null && tabType != '') {
      this.selected = item.Name;
      this.tabType = tabType;
    }
  }

  isActive(item: any) {
    return ['nav-link' ,'fill-li',  this.selected === item.Name ? 'active' : ''];
  }

}
