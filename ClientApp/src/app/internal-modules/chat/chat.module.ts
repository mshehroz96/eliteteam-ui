import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatUsersComponent } from './components/chat-users/chat-users.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    ChatComponent,
    ChatUsersComponent,
    ChatMessagesComponent
  ],
  exports:[
    ChatComponent,
    ChatUsersComponent,
    ChatMessagesComponent
  ]
})
export class ChatModule { }
