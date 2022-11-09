import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Notification, UpdateNotificationSetting, UserNotificationSetting } from 'src/app/_models/notification/notification';
import { User } from 'src/app/_models/user/user';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notification-manage',
  templateUrl: './notification-manage.component.html',
  styleUrls: ['./notification-manage.component.css'],
})
export class NotificationManageComponent implements OnInit {
  @Input() SelfSetting: boolean = true;
  @Input() UserData: User = new User();
  @ViewChild('ddNotification') ddNotification!: ElementRef;
  notificationForm!: FormGroup;
  notifications: Notification[] = [
    {
      title: '',
      email: 0,
      sms: 0,
      whatsApp: 0,
    },
  ];

  notificationObj: UpdateNotificationSetting = new UpdateNotificationSetting();
  constructor(private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadNotificationTable();
  }

  private loadNotificationTable() {
    this.userService
      .getNotifications(this.UserData.userType, this.UserData.userId)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.notifications.splice(0, this.notifications.length);
          this.notifications = res.data;
          this.loadNotificationSettings();
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          });
        }
      });
  }

  private loadNotificationSettings() {
    this.userService
      .getNotificationSettings(this.UserData.userId)
      .subscribe((res: any) => {
        if (res.success == true) {
          res.data.forEach((element: UserNotificationSetting) => {
            if (element.isSelected == true) {
              this.notificationObj.turnOnNotifications.push(element.notificationSettingID);
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          });
        }
        this.updateCheckBoxCurrentValue();
      });
    //console.log(this.turnOnNotifications);

  }

  private updateCheckBoxCurrentValue() {
    for (var i = 0; i < this.notificationObj.turnOnNotifications.length; i++) {
      var checkbox = document.getElementById('chk' + this.notificationObj.turnOnNotifications[i].toString()) as HTMLInputElement;
      checkbox.checked = true;
    }
  }

  updateCheckedOptions(event: any) {
    if (event.target.checked == true) {
      this.notificationObj.turnOnNotifications.push(parseInt(event.target.name));
    } else {
      const index = this.notificationObj.turnOnNotifications.indexOf(
        parseInt(event.target.name),
        0
      );
      if (index > -1) {
        this.notificationObj.turnOnNotifications.splice(index, 1);
      }
    }
    //console.log(this.turnOnNotifications);
  }

  updateNotification() {
    if (this.SelfSetting == true) {
      this.notificationObj.sendNotification = this.ddNotification.nativeElement.value;
    }
    this.notificationObj.userID = this.UserData.userId;
    this.notificationObj.modifiedBy = this.userService.getLoggedInUserDetail().userId;
    this.userService.updateNotificationSetting(this.notificationObj).subscribe((res: any) => {
      if (res.success == true) {
        Swal.fire({
          title: 'Notification',
          text: res.message,
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        });
      }
    });
  }
}
