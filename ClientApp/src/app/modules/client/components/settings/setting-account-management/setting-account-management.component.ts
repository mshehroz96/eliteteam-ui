import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'setting-account-management',
  templateUrl: './setting-account-management.component.html',
  styleUrls: ['./setting-account-management.component.css']
})
export class SettingAccountManagementComponent implements OnInit {

  userType:number = 0;
  constructor(private authService: AuthenticationService ) { }

  ngOnInit(): void {
    this.userType = this.authService.currentUserValue.userType;
  }

}
