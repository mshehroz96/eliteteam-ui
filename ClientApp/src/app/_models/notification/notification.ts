export class Notification {
  title: string = '';
  email: number = 0;
  sms: number = 0;
  whatsApp: number = 0;
}


export class UserNotificationSetting {
  notificationSettingID: number = 0;
  isSelected: boolean = false;
  orderNo: number = 0;
}


export class UpdateNotificationSetting {
  sendNotification: number = -1;
  turnOnNotifications: number[] = [];
  userID: number = 0;
  modifiedBy: number = 0;
}
