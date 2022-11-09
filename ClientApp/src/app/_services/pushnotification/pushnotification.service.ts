import { Injectable } from "@angular/core";
import { data } from "jquery";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { Permission, PushNotification } from "src/app/_models/pushnotification/pushnotification";

@Injectable()
export class PushNotificationsService {
    life:number=10000;
    public permission: Permission;
    constructor(private messageService:MessageService) {
        this.permission = this.isSupported() ? 'default' : 'denied';
    }
    public isSupported(): boolean {
        return 'Notification' in window;
    }
    requestPermission(): void {

        let self = this;
        if (this.isSupported() && this.permission == 'default') {

            document.addEventListener('click', () => {
                if (this.permission == 'default') {
                    Notification.requestPermission(function (status) {
                        return self.permission = status;
                    });
                }
            });
        }
    }
    private create(title: string, options?: PushNotification): any {
        let self = this;
        return new Observable(function (obs) {
            if (!self.isSupported()) {
                console.log('Notifications are not available in this environment');
                obs.complete();
            }
            if (self.permission !== 'granted') {
                console.log("The user hasn't granted you permission to send push notifications");
                obs.complete();
            }
            let _notify = new Notification(title, options);
            _notify.onshow = function (e) {
                return obs.next({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclick = function (e) {
                return obs.next({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onerror = function (e) {
                return obs.error({
                    notification: _notify,
                    event: e
                });
            };
            _notify.onclose = function () {
                return obs.complete();
            };
        });
    }
    generateNotification(item: any): void {

        let self = this;
        // let options = {
        //     body: item.content,
        //     icon:'/assets/img/branding/logo.jpg',
        // };

        // let notify = self.create(item.title, options).subscribe();

        if(item.key)
        {
            this.messageService.add({
                key: "msg", 
                severity: item.styleClass ?? "none",
                summary: item.title,
                detail: item.content,
                data: item.data,
                life: this.life
            });        
        }
        else
        {
            this.messageService.add({
                severity: "info",
                summary: item.title,
                detail: item.content,
                data: item.data,
                life: this.life
            });
        }
      
        self.playSound();
    }

    private playSound() {
        let sound = "/assets/audio/Message_Notification.mp3";
        sound && (new Audio(sound)).play()
    }
}