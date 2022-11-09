import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FILES_PATHS } from 'src/app';
import { User } from 'src/app/_models/user/user';
import { ChatService } from 'src/app/_services';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  strUserAvatarURL: string = "";
  currentUser!: User;
  globalMessages: number = 0;
  globalNotifications: number = 0;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.strUserAvatarURL = FILES_PATHS.MAP_USER_AVATARS(this.currentUser.avatarFileName);
    });

    this.chatService.globalMessages.subscribe((x) => {
      this.globalMessages = x;

    });

    this.chatService.newMessages.subscribe((x) => {
      this.globalMessages = this.globalMessages + x;
    });

    this.chatService.globalNotifications.subscribe((x) => {
      this.globalNotifications = x;

    });

    this.chatService.newNotifications.subscribe((x) => {
      this.globalNotifications = this.globalNotifications + x;
    });
    
  }
  ngOnInit(): void { 
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }
  getUserSettingsURL(){
    var url = "";
    if (this.currentUser.userTypeStr == "Administrator") {
      url = "/admin/main-setting";
    } else if (this.currentUser.userTypeStr == "RecruiterManager") {
      url = "/recruitment/settings";
    } else if (this.currentUser.userTypeStr == "Recruiter") {
      url = "/recruitment/settings";
    } else if (this.currentUser.userTypeStr == "JobPostManager") {
      url = "/jobpost/settings";
    } else if (this.currentUser.userTypeStr == "ClientAdmin") {
      url = "/client/settings"
    } else if (this.currentUser.userTypeStr == "ClientUser") {
      url = "/client/settings";
    } else if (this.currentUser.userTypeStr == "Candidate") {
      url = "/candidate/setting-account";
    } else if (this.currentUser.userTypeStr == "ExternalInterviewer") {
      url = "";
    } else if (this.currentUser.userTypeStr == "ProspectClient") {
      url = ""
    } else if (this.currentUser.userTypeStr == "PublicVisitor") {
      
    }
    return url;
  }
}
