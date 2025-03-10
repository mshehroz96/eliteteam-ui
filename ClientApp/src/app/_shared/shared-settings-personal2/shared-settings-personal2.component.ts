import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User2Service } from 'src/app/_services/user/user2.service';

@Component({
  selector: 'shared-settings-personal2',
  templateUrl: './shared-settings-personal2.component.html',
  styleUrls: ['./shared-settings-personal2.component.css']
})
export class SharedSettingsPersonal2Component implements OnInit, AfterViewInit {

  userInfo: any = {};
  titles : any[] = [];
  selectedTitle : number = 0;
  constructor(public userService: User2Service) { }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getUserDetail();
    this.getTitles();
  }

  getUserDetail() {
    this.userService.getUserDetail().subscribe((res) => {
      if (res?.success) {
        this.userInfo = res.data;
      }

    },
      error => {
        console.log(error);
      });
  }

  saveUserDetail() {
    this.userService.saveUserDetail(this.userInfo).subscribe((res: any) => {
      if (res?.success) {
        alert('User details saved successfully');
      }
    }
      , (error: any) => {

      });
  }

  getTitles() {
    this.userService.getTitles().subscribe((res) => {
      if (res?.success) {
        this.titles = res.data.titles;
      }
    },
      error => {
        console.log(error);
      });
  }
}
