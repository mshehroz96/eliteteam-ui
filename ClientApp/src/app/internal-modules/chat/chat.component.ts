import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/chat/message';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { User } from 'src/app/_models/user/user';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { ChatService } from 'src/app/_services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @Input() module:string=''
  joined: boolean = false;
  nodataMessage:boolean=false;
  constructor(public chatService: ChatService) 
  {
    this.chatService.channelType=1;
    this.chatService.requisition=new ChatRequisition();
    this.chatService.joinedUser=new ChatUser();
    this.chatService.messages=[];
    
  }


  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {

    
    this.chatService.joined$.subscribe((x) => {
      this.joined = x;
    });
  }

  usersLoaded(values:any[])
  {
    if(values.length==0)
      this.nodataMessage=true;
  }

}
