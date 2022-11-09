import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/_models/user/user';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main-setting',
  templateUrl: './main-setting.component.html',
  styleUrls: ['./main-setting.component.css'],
})
export class MainSettingComponent implements OnInit {
  public getValueOnscreening: String = 'Availabilty';
  public tabType: string = 'security';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: any;

  constructor(private dialog: MatDialog) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    const currentTab = this.getParameterByName('tab');
    if (currentTab) {
      this.tabType = currentTab;
      this.selected = currentTab == 'users' ? 'User Management' : '';
    }
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
      Name: 'My Schedules',
      RouteName: 'recruiter-schedule',
      Icon: 'bx bx-notepad me-1',
    });
    // this.menuList.push({
    //   Name: 'User Management',
    //   RouteName: 'users',
    //   Icon: 'bx bx-user me-1',
    // });
  }

  getParameterByName(name: string, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

  loadTab(item: any, tabType: string, event: any) {
    event.preventDefault();
    if (tabType != null && tabType != '') {
      this.selected = item.Name;
      this.tabType = tabType;
    }
  }

  isActive(item: any) {
    return ['nav-link', 'fill-li', this.selected === item.Name ? 'active' : ''];
  }
}
