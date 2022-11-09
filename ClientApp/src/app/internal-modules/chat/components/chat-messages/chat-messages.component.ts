import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/chat/message';
import { ChatService } from 'src/app/_services';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @ViewChild('chatContainer') private chatContainer: ElementRef = null!;
  messages: Message[] = null!;
  message!:Message;
  constructor(public chatService:ChatService) {
    this.messages = new Array<Message>();
    this.message=new Message();
  }
  ngOnInit() {
    
    
    this.chatService.message$.subscribe((message) => {

      if (this.messages.filter(x => x.uuid == message.uuid).length == 0 
      && message.channelType == this.chatService.channelType) {
        this.messages = [...this.messages, message];
        this.scrollToBottom();
      }
      
    });

    this.chatService.messages$.subscribe((messages) => {

      this.messages = messages;
      this.scrollToBottom();

    });


  }

  sendMessage()
  {
    if(this.message.content!='')
    {
      let msg = new Message()
      msg.content=this.message.content;
      this.chatService.sendMessage(msg);
      this.message.content='';

      this.scrollToBottom();

    }
  }
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  
}
