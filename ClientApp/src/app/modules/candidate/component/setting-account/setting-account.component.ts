import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.css']
})
export class SettingAccountComponent implements OnInit {

  constructor() { }

  isSecurity : boolean = false;
  isAccount : boolean = true;
  isNotification : boolean = false;
  ngOnInit(): void {
  }

  activeSecurity(){
    this.isSecurity = true;
    this.isNotification = false;
    this.isAccount = false;
  }
  activeNotification(){
    this.isSecurity = false;
    this.isNotification = true;
    this.isAccount = false;
  }
  activeAccount(){

    this.isSecurity = false;
    this.isNotification = false;
    this.isAccount = true;
  }


}
