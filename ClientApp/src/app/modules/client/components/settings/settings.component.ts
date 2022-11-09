import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';


@Component({
  selector: 'client-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  userType:number = 0;
  public getValueOnscreening: String = 'Availabilty';
  public tabType: string = 'setting-account-management';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string = 'Account';

  constructor(private dialog: MatDialog,
    private authService: AuthenticationService ) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    const currentTab = this.getParameterByName('tab');
    if (currentTab) {
      this.tabType = currentTab;
      this.selected = currentTab == 'users' ? 'User Management' : '';
    }
  }

  ngOnInit(): void {
    this.userType = this.authService.currentUserValue.userType;
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push(
      {
       Name: 'Account',
       RouteName: 'setting-account-management',
       Icon: 'bx bx-lock-alt me-1',
     });
    this.menuList.push(
     {
      Name: 'Security',
      RouteName: 'security',
      Icon: 'bx bx-lock-alt me-1',
    });
    if(this.userType == 5 || this.userType == 6){
      this.menuList.push(
        {
         Name: 'Billing',
         RouteName: 'setting-billing-details',
         Icon: 'bx bx-lock-alt me-1',
       });
    }
    this.menuList.push({
      Name: 'Notifications',
      RouteName: 'notification',
      Icon: 'bx bx-bell me-1',
    });
    if(this.userType == 5){
      this.menuList.push({
        Name: 'Data Management',
        RouteName: 'setting-data-management',
        Icon: 'bx bx-purchase-tag-alt me-1',
      });
    }
    if(this.userType == 5 || this.userType == 1){
      this.menuList.push({
        Name: 'User Management',
        RouteName: 'users',
        Icon: 'bx bx-user me-1',
      });
    }
   
    
  }

  getParameterByName(name: string, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
