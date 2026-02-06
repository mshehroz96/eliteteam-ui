import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { candidatefilter } from 'src/app/_models/client/candidatefilter';
import { User } from 'src/app/_models/user/user';
import { ChatService } from 'src/app/_services';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css'],
})

export class AsideMenuComponent implements OnInit {
  public step: String = 'step1';
  public user!: User;
  candidateFilter : candidatefilter = {};
  public menuList: [{ Name: string; RouteName: string; Icon: string; }];
  selected: any;
  jobs: number = 0;

  constructor(
    private authService: AuthenticationService,
    
    private candidateService : CandidateService) 
    {
      this.user=this.authService.currentUserValue;
      this.menuList = [{ Name: '', RouteName: '', Icon: '' }];

  }

  public getValueOnscreening : String = '';

  onScreeningQuestion(onScreeningValue:String )
  {
    this.getValueOnscreening = onScreeningValue;
  }

  ngOnInit(): void {
    this.menuList.splice(0, this.menuList.length);
    if (this.user.userTypeStr == null || this.user.userTypeStr == '') {
      this.menuList.push({Name:'Dashboard', RouteName:'/dashboard', Icon: 'bx bx-pie-chart-alt-2'});
      this.menuList.push({Name:'User', RouteName:'/users', Icon: 'bx bx-user'});
    } else if (this.user.userTypeStr == "Administrator") {
      this.menuList.push({Name:'Dashboard', RouteName:'/admin/dashboard', Icon: 'bx bx-pie-chart-alt-2'});
      this.menuList.push({Name:'Users', RouteName:'/admin/users', Icon: 'bx bx-user'});
      this.menuList.push({Name:'Users2', RouteName:'/admin/users2', Icon: 'bx bx-user'});
      this.menuList.push({Name:'Settings', RouteName:'/admin/main-setting', Icon: 'bx bx-cog'});
    } else if (this.user.userTypeStr == "RecruiterManager") {
      this.menuList.push({Name:'Dashboard', RouteName:'/recruitment/dashboard', Icon: 'bx bx-pie-chart-alt-2'});
      this.menuList.push({Name:'Clients', RouteName:'/recruitment/clients', Icon: 'bx bxs-user-rectangle'});
      this.menuList.push({Name:'Recruiters', RouteName:'/recruitment/recruiters', Icon: 'bx bx-user'});
      this.menuList.push({Name:'Settings', RouteName:'/recruitment/settings', Icon: 'bx bx-cog'});
    } else if (this.user.userTypeStr == "Recruiter") {
      this.menuList.push({Name:'Dashboard', RouteName:'/recruiter/dashboard', Icon: 'bx bx-pie-chart-alt-2'} );
      this.menuList.push({ Name: 'Messages', RouteName:'/recruiter/messages', Icon: 'bx bxs-chat'} );
      this.menuList.push({Name:'Showcase', RouteName:'/recruiter/recruiter-showcase', Icon: 'bx bxs-id-card'});
      this.menuList.push({Name:'Active Jobs', RouteName:'/recruiter/jobs-active', Icon: 'bx bx-play'} );
      this.menuList.push({Name : 'Active Jobs2', RouteName : '/recruiter/jobs-active2', Icon : 'bx bx-play'} );
      this.menuList.push({Name:'Interview Calendar', RouteName:'/recruiter/calendar', Icon: 'bx bx-calendar'} );
      this.menuList.push({Name:'Candidates', RouteName:'/recruiter/candidates', Icon: 'bx bxs-user'});
      this.menuList.push({Name:'Settings', RouteName:'/recruiter/main-setting', Icon: 'bx bx-cog'});
    } else if (this.user.userTypeStr == "JobPostManager") {
      this.menuList.push({Name:'Dashboard', RouteName:'/jobpost/dashboard', Icon: 'bx bx-pie-chart-alt-2'});
      this.menuList.push({Name:'Pending Jobs', RouteName:'/jobpost/jobs-pending', Icon: 'bx bxs-time'});
      this.menuList.push({Name:'Active Jobs', RouteName:'/jobpost/jobs-active', Icon: 'fa fa-play'} );
      this.menuList.push({Name:'Inactive Jobs', RouteName:'/jobpost/jobs-inactive', Icon: 'fa fa-stop'} );
      this.menuList.push({Name:'Settings', RouteName:'/jobpost/settings', Icon: 'fa fa-cogs'});
    } else if (this.user.userTypeStr == "ClientAdmin") {
      this.menuList.push({Name:'Dashboard', RouteName:'/client/dashboard', Icon: 'bx bx-pie-chart-alt-2'} );
      this.menuList.push({Name:'Messages', RouteName:'/client/messages', Icon: 'bx bxs-chat'} );
      this.menuList.push({Name:'Showcase', RouteName:'/client/showcase', Icon: 'bx bxs-id-card'});
      this.menuList.push({Name:'Jobs', RouteName:'/client/jobs', Icon: 'bx bx-briefcase'} );
      this.menuList.push({Name:'Interview Calendar', RouteName:'/client/client-calendar', Icon: 'bx bx-calendar'} );
      this.menuList.push({Name:'Settings', RouteName:'/client/settings', Icon: 'bx bx-cog'});
    } else if (this.user.userTypeStr == "ClientUser") {
      this.menuList.push({Name:'Dashboard', RouteName:'/client/dashboard', Icon: 'bx bx-pie-chart-alt-2'} );
      this.menuList.push({Name:'Messages', RouteName:'/client/messages', Icon: 'bx bxs-chat'} );
      this.menuList.push({Name:'Showcase', RouteName:'/client/showcase', Icon: 'bx bxs-id-card'});
      this.menuList.push({Name:'Jobs', RouteName:'/client/jobs', Icon: 'bx bx-briefcase'} );
      this.menuList.push({Name:'Interview Calendar', RouteName:'/client/client-calendar', Icon: 'bx bx-calendar'} );
      this.menuList.push({Name:'Settings', RouteName:'/client/settings', Icon: 'bx bx-cog'});
    } else if (this.user.userTypeStr == "Candidate") {



      this.candidateFilter.candidateUserId = 0;
      this.candidateFilter.requisitionUUID = "";
      this.candidateService.getCandidateRequisitionCount(this.candidateFilter).subscribe((res) => {
        if(res?.success){
          this.jobs = res?.data;
          this.menuList.push({Name:'Dashboard', RouteName:'/candidate/dashboard', Icon: 'bx bx-pie-chart-alt-2'} );
          this.menuList.push({ Name: 'My Jobs <span  class="badge bg-secondary float-end ml-1">'+ this.jobs +'</span>', RouteName:'/candidate/my-jobs', Icon: 'bx bx-play'});
          this.menuList.push({ Name: 'Messages', RouteName:'/candidate/messages', Icon: 'bx bxs-chat'} );
          this.menuList.push({ Name: 'My Profile', RouteName:'/candidate/myprofile', Icon: 'bx bxs-id-card'});
          this.menuList.push({ Name: 'Settings', RouteName:'/candidate/setting-account', Icon: 'bx bx-cog'});
        }

    });





    } else if (this.user.userTypeStr == "ExternalInterviewer") {

    } else if (this.user.userTypeStr == "ProspectClient") {

    } else if (this.user.userTypeStr == "PublicVisitor") {

    }
  }

  select(item: any) {
    this.selected = item.Name;
  }
  isActive(item: any) {
    return  ['menu-item', this.selected === item.Name ? 'active' :''];

  }
}
