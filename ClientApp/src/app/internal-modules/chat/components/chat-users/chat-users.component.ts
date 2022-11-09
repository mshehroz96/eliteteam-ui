import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FILES_PATHS } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { ChatService } from 'src/app/_services';
import { ChatUsersService } from 'src/app/_services/chat/chat-users.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  requisitions: ChatRequisition[] = [];
  searchAbleRequisitions: ChatRequisition[] = [];
  @Output('usersLoaded') usersLoaded = new EventEmitter<ChatRequisition[]>();
  searchText: string = '';
  constructor(
    public loadingService: LoadingService,
    public chatService: ChatService,
    public chatUserService: ChatUsersService) {
    this.requisitions = new Array<ChatRequisition>();
  }

  ngOnInit() {

    this.chatUserService.getUsers().subscribe((res) => {

      if (res.success) {

        res.data.map((x: any) => {
          x.companyLogo = FILES_PATHS.MAP_COMPANY_LOGO(x.companyLogo);
          return x;
        });

        this.requisitions = res.data;
        this.searchAbleRequisitions = res.data;
        this.requisitions.map((x) => {
          x.collapsed = true;
          x.cssClass = 'bx-plus';
          return x;
        });

        this.searchAbleRequisitions.map((x) => {
          x.collapsed = true;
          x.cssClass = 'bx-plus';
          return x;
        });

        this.usersLoaded.emit(this.requisitions);

      }
    });

    this.chatService.resetUnReadMessages.subscribe((x) => {
      this.requisitions.map((req) => {
        if (req.requisitionId == x.requisitionId) {
          var count = req.candidates.find(c => c.userId == x.fromUserId)?.unReadMessages ?? 0;
          req.unReadMessages = req.unReadMessages - count;
        }
        req.candidates.map((candidate) => {
          if (candidate.userId == x.fromUserId) {
            candidate.unReadMessages = 0;
          }
        })
        return req;
      });
    });

    this.chatService.userUnReadMessages.subscribe((x) => {
      this.requisitions.map((req) => {
        if (req.requisitionId == x.requisitionId) {
          req.unReadMessages = req.unReadMessages + 1;
        }
        req.candidates.map((candidate) => {
          if (candidate.userId == x.fromUserId) {
            candidate.unReadMessages = candidate.unReadMessages + 1;
          }
        })
        return req;
      });
    });
  }

  toggleCandidates(requisition: ChatRequisition) {
    this.requisitions.filter(x => x.requisitionId == requisition.requisitionId).map((x) => {
      if (x.collapsed == true) {
        x.collapsed = false;
        x.cssClass = 'bx-minus';
      }
      else {
        x.collapsed = true;
        x.cssClass = 'bx-plus';
      }
      return x;
    })
  }

  searchUser(event: any) {
    console.log(event);
    console.log(this.searchText);
    if (this.searchText.length > 0) {
      this.searchAbleRequisitions.filter((x) => {
        x.candidates = x.candidates.filter((c) => c.firstName.includes(this.searchText) || c.lastName.includes(this.searchText))
      });
    }

    if (this.searchText.length == 0) {
      this.searchAbleRequisitions.map(x => {
        x.candidates = this.requisitions.find((x) => x.requisitionId == x.requisitionId)?.candidates ?? new Array<ChatUser>();
      });
    }
  }

}
