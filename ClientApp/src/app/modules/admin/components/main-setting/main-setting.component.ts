import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/recruiter/components/dialog/dialog.component';
import { User } from 'src/app/_models/user/user';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-setting',
  templateUrl: './main-setting.component.html',
  styleUrls: ['./main-setting.component.css'],
})
export class MainSettingComponent implements OnInit {
  public getValueOnscreening: String = 'Availabilty';
  public tabType: string = 'account';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string='Account';
  selfSetting=true;
  userDetailData:User;

  constructor(private dialog: MatDialog, private userService:UserService) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    this.userDetailData = new User();

  }

  ngOnInit(): void {
    this.userDetailData.userId=this.userService.getLoggedInUserDetail().userId;
    this.userDetailData.userType=this.userService.getLoggedInUserDetail().userTypeLIID;

    this.menuList.splice(0, this.menuList.length);
    this.menuList.push({
      Name: 'Account',
      RouteName: 'account',
      Icon: 'bx bx-lock-alt me-1',
    });
    this.menuList.push(
      {
          Name: 'Account2',
          RouteName : 'account2',
          Icon: 'bx bx-lock-alt me-1',
      }
    );
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
      Name: 'Pricing',
      RouteName: 'pricing',
      Icon: 'bx bx-purchase-tag-alt me-1',
    });
    this.menuList.push({
      Name: 'Lists',
      RouteName: 'lists',
      Icon: 'bx bx-list-ul me-1',
    });
    this.menuList.push({
      Name: 'list2', 
      RouteName: 'list2',
      Icon: 'bx bx-cog me-1',
    });
    this.menuList.push({
      Name: 'Thresholds',
      RouteName: 'threshod-settings',
      Icon: 'bx bx-detail me-1',
    });
    this.menuList.push({
      Name: 'Templates',
      RouteName: 'communication-templates',
      Icon: 'bx bx-envelope me-1',
    });
    this.menuList.push({
      Name: 'Plans',
      RouteName: 'plans',
      Icon: 'bx bx-package me-1',
    });
    this.menuList.push({
      Name: 'OWIT Templates',
      RouteName: 'owit-templates',
      Icon: 'bx bx-book-content me-1',
    });
    this.menuList.push({
      Name: 'OL Templates',
      RouteName: 'ol-templates',
      Icon: 'bx bx-book-content me-1',
    });
  }

  onDeleteQuestion() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  onScreeningQuestion(onScreeningValue: String) {
    this.getValueOnscreening = onScreeningValue;
  }

  changeBackground(onScreeningValue: String): any {
    if (this.getValueOnscreening === onScreeningValue) {
      return { 'background-color': '#3d75a8', color: 'white' };
    } else {
      return '';
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent);
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
