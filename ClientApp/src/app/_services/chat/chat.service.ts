import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Methods } from 'src/app/_helper/method';
import { Message } from 'src/app/_models/chat/message';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { Requisition } from 'src/app/_models/requisition/requisition';
import { User } from 'src/app/_models/user/user';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { PushNotificationsService } from '../pushnotification/pushnotification.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUser!: User;
  channelType = 0;
  
  joinedUser!: ChatUser;
  requisition!: ChatRequisition;
  globalMessages = new Subject<number>();
  globalNotifications = new Subject<number>();
  newMessages = new Subject<number>();
  newNotifications = new Subject<number>();
  userUnReadMessages = new Subject<Message>();
  resetUnReadMessages = new Subject<Message>();
  isReconnecting=new Subject<boolean>();
  isClosed = new Subject<boolean>();
  isReconnected = new Subject<boolean>();
  private _joined:boolean=false;  
  message$ = new Subject<Message>();
  messages$ = new BehaviorSubject<any[]>([]);
  users$ = new BehaviorSubject<ChatUser[]>([]);

  messages:Message[]=[];
  message!:Message;

  connectionEstablished$ = new BehaviorSubject<boolean>(false);
  joined$ = new BehaviorSubject<boolean>(false);

  private hubConnection: HubConnection = null!;

  constructor(private readonly authenticationService: AuthenticationService,
    private readonly pushNotificationService: PushNotificationsService) {

    if (this.authenticationService.currentUserValue) {
      this.joinedUser = new ChatUser();
      this.currentUser = this.authenticationService.currentUserValue;
      this.createConnection();
      this.registerOnServerEvents();
      this.startConnection();
      this.message=new Message();
      this.messages=new Array<Message>();
    }

    this.connectionEstablished$.subscribe(x=>{
      if(x==true){
        this.getUnReadMessages();
        this.getUnReadNotifications();
      }
    });
  }

  sendMessage(msg:Message) {

    if (this.joined$.value==false || this.connectionEstablished$.value==false)
      return;

   msg.channelType=this.channelType;
   msg.requisitionId=this.requisition.requisitionId;
   msg.fromUserId = this.currentUser.userId;
   msg.fromName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
   msg.toUserId = this.joinedUser.userId;
   msg.toName = this.joinedUser.fullName;
   
   msg.isMine = true;

    if (msg.content != '') {
      var lastDate = '';

      if (this.messages.length > 0) {
        var lastMessage = this.messages[this.messages.length - 1] as Message;
        lastDate = Methods.customDateFormat(new Date(parseInt(lastMessage.sentOn)), 'EEEE, MMMM dd yyyy');
      }

      msg.sentOn = Methods.getUTCTime(new Date()).toString();
      msg.date = Methods.customDateFormat(new Date(parseInt(msg.sentOn)), 'EEEE, MMMM dd yyyy');
      msg.timestamp = Methods.customDateFormat(new Date(parseInt(msg.sentOn)), 'hh:mm a');
      msg.messageId = 0;
      msg.avatar =  this.currentUser.avatarFileName;
      msg.uuid = Methods.generateUUID();

      if (msg.date == lastDate)
        msg.date = '';

      this.message$.next(msg);

      this.hubConnection.invoke('SendMessage', msg);

    }

  }

  getMessagesHistory() {

    if(this._joined)
    {
      let obj = {
        fromId: this.currentUser.userId,
        toId: this.joinedUser.userId,
        requisitionId: this.requisition.requisitionId,
        channelType: this.channelType
      };

      console.log(obj);

      this.hubConnection.invoke('GetMessagesHistory', obj);
    }
  }

  getUnReadMessages() {
    this.hubConnection.invoke('GetUnReadMessages', this.currentUser.userId);  
  }

  getUnReadNotifications() {
    this.hubConnection.invoke('GetUnReadNotifications', this.currentUser.userId);
  }

  updateReadTimeStamp() {

    let obj = {
      fromId: this.joinedUser.userId,
      toId: this.currentUser.userId,
      requisitionId: this.requisition.requisitionId,
      channelType: this.channelType
    };

    this.hubConnection.invoke('UpdateReadTimeStamp', obj);
  }

  updateMessageReadTimeStamp(uuid: string) {

    var timeStamp = Methods.getUTCTime(new Date()).toString();
    this.hubConnection.invoke('UpdateMessageReadTimeStamp', uuid);
  }

  setChannelType(channelType: number) {
    this.channelType = channelType;
    
    this.getMessagesHistory();
  }
  setJoinChat(user: ChatUser, requisition: ChatRequisition) {
    this.requisition = requisition;
    this.joinedUser = user;
    this.joined$.next(true);
    this._joined=true;
    this.messages$.next([]);

    console.log(this.connectionEstablished$.value);

    if(this.connectionEstablished$.value==false)
    {
      this.connectionEstablished$.subscribe((x) => {
        this.getMessagesHistory();
      });
      
    }
    else
    {
      this.getMessagesHistory();
    }
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.chatApiUrl + 'chatHub?uuid=' + this.currentUser.userId,
        { accessTokenFactory: () => this.authenticationService.currentUserValue.accessToken })
      .withAutomaticReconnect()
      //.configureLogging(LogLevel.Information)
      .build();

    this.hubConnection.onreconnecting(() => {
      this.isReconnecting.next(true);
      (error: any) => console.error(error);
    });

    this.hubConnection.onreconnected(() => {
      this.isReconnected.next(true);
      //console.log("reconnected to hub", this.hubConnection.state);
      (error: any) => console.error(error);
    });

    this.hubConnection.onclose(() => {
      this.isClosed.next(true);
      //console.log("connection closed", this.hubConnection.state);
      (error: any) => console.error(error);
    });
  }

  private startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        this.connectionEstablished$.next(true);
      },
      error => console.error(error)
    );
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('LoadUnReadMessage', (count: number) => {
      this.globalMessages.next(count);
    });

    this.hubConnection.on('LoadUnReadNotifications', (count: number) => {
      this.globalNotifications.next(count);
    });

    this.hubConnection.on('LoadUsers', (data: ChatUser[]) => {
      this.users$.next(data);
    });

    this.hubConnection.on('LoadMessagesHistory', (data: Message[]) => {

      var lastdate = '';

      data.forEach((item) => {

        item.date = Methods.customDateFormat(new Date(parseInt(item.sentOn)), 'EEEE, MMMM dd yyyy')

        if (lastdate != item.date) {
          lastdate = item.date;
        }
        else {
          item.date = '';
        }

        item.timestamp = Methods.customDateFormat(new Date(parseInt(item.sentOn)), 'hh:mm a');

        if (item.fromUserId == this.currentUser.userId) {
          item.isMine = true;
        }
        else {
          item.isMine = false;
        }

      });

      this.messages$.next(data);

      this.updateReadTimeStamp();

      this.resetUnReadMessages.next({fromUserId:this.joinedUser.userId,requisitionId:this.requisition.requisitionId} as Message);

      this.getUnReadMessages();

    });

    this.hubConnection.on('MessageReceived', (data: any) => {

      data.timestamp = Methods.customDateFormat(new Date(parseInt(data.sentOn)), 'hh:mm a');

      if (data.fromUserId == this.currentUser.userId) {
        data.isMine = true;
      }
      else {
        data.isMine = false;
      }


      if (data.toUserId === this.currentUser.userId && this.joinedUser.userId == data.fromUserId) {
        this.message$.next(data);
        this.updateMessageReadTimeStamp(data.uuid);
      }
      else {
        this.pushNotificationService.generateNotification(
          { 
            title: `New message from ${data.fromName}`, 
            content: `${data.content}`,
            key:"msg",
            data:data 
        });

        this.newMessages.next(1);

        this.userUnReadMessages.next(data);
      }

      this.getUnReadMessages();

    });

    this.hubConnection.on('NotificationReceived', (data: any) => {
      this.pushNotificationService.generateNotification({ title: `${data.title}`, content: `${data.body}` });
      this.newNotifications.next(1);
    });

  }

}