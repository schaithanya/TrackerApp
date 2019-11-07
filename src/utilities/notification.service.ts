import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable()
export class NotificationService{

  constructor(private localNotifications: LocalNotifications) 
  { }

  public scheduleNotification(notificationData: any, scheduleDate: Date){      

    let firstNotificationDate = scheduleDate;
    firstNotificationDate.setHours(8);
    firstNotificationDate.setMinutes(0);
    firstNotificationDate.setMilliseconds(0);

    let secondNotificationDate = scheduleDate;
    firstNotificationDate.setHours(12);
    firstNotificationDate.setMinutes(0);
    firstNotificationDate.setMilliseconds(0);

    // Schedule multiple notifications
    this.localNotifications.schedule(
    [
      {
        id: Date.now(),
        title: 'Tracker App Notification',
        text: notificationData,
        trigger: { at: firstNotificationDate },   
        icon: 'http://example.com/icon.png',
        data: { secret: notificationData },
        sound: null
      },
      {
        id: Date.now() + 1,
        title: 'Tracker App Notification',
        text: notificationData,
        trigger: { at: secondNotificationDate },   
        icon: 'http://example.com/icon.png',
        data: { secret: notificationData },
        sound: null
      }
    ]);  
  }
}