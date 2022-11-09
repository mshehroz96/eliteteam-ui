import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recruitermanager-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public getValueOnscreening: String = 'Availabilty';
  public tabType: string = 'account';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string = 'Account';

  constructor() {

    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    const currentTab = this.getParameterByName('tab');
    if (currentTab) {
      this.tabType = currentTab;
      this.selected = currentTab == 'account' ? 'Account' : '';
    }
  }

  ngOnInit(): void {
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push(
      {
       Name: 'Account',
       RouteName: 'account',
       Icon: 'bx bx-lock-alt me-1',
     });
    this.menuList.push(
     {
      Name: 'Security',
      RouteName: 'security',
      Icon: 'bx bx-lock-alt me-1',
    });
    this.menuList.push({
      Name: 'Notifications',
      RouteName: 'notification',
      Icon: 'bx bx-bell me-1',
    });

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
