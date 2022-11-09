import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client/client.service';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public tabType: string = 'clients-unassigned';
  public menuList: [{ Name: string; RouteName: string; Icon: string }];
  selected: string='Unassigned Clients';
  selfSetting=true;


  constructor(private clientService:ClientService) {
    this.menuList = [{ Name: '', RouteName: '', Icon: '' }];
    this.clientService.selected = this.selected;
  }


  ngOnInit(): void {
    this.menuList.splice(0, this.menuList.length);
    this.menuList.push({
      Name: 'Unassigned Clients',
      RouteName: 'clients-unassigned',
      Icon: '',
    });
    this.menuList.push({
      Name: 'Assigned Clients',
      RouteName: 'clients-assigned',
      Icon: '',
    });
  }

  loadTab(item: any, tabType: string, event:any) {
    event.preventDefault();
    if (tabType != null && tabType != '') {
      this.selected = item.Name;
      this.clientService.selected = item.Name;
      this.tabType = tabType;
    }
  }

  isActive(item: any) {
    return ['nav-link' ,'fill-li',  this.selected === item.Name ? 'active' : ''];
  }
}
