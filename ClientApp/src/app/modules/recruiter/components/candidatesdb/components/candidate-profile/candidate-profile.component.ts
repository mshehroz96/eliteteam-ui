import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ChatRequisition, ChatUser } from 'src/app/_models/chatUser/chatUser';
import { candidateBasicInfofilter } from 'src/app/_models/client/candidatefilter';
import { ChatService } from 'src/app/_services';
import { CandidateService } from 'src/app/_services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService,
    public loadingService: LoadingService,private chatService: ChatService) { }

  candidateInfo: any = {};
  onewayInterviewAnswers : any[] = [];
  candidateBasicInfoFilter : candidateBasicInfofilter = {};
  blocked: boolean = false;
  products: [] = [];
  candidateStats: any = {};
  candidateRequisitions: any[] = [];

  ngOnInit(): void {
    this.candidateBasicInfoFilter.candidateUserId =this.route.snapshot.params['candidateUserID'];
    this.candidateBasicInfoFilter.candidateCVId =this.route.snapshot.params['CandidateCVId'];

    this.getCandidateBasicInfo();
  }

  getCandidateBasicInfo(){
  this.loadingService.doLoading(
    this.candidateService.getCandidateBasicInfo(this.candidateBasicInfoFilter), this
  ).subscribe((res) => {
    if (res.success) {
      if(res?.success){
        console.log(res?.data);
        this.candidateInfo  = res?.data.candidateBasicInfo;
        this.onewayInterviewAnswers = res?.data.candidateOneWayInterviews;
        this.candidateStats = res?.data.candidateStats;
        this.candidateRequisitions= res?.data.candidateRequisitions;
        this.candidateInfo.hideAccountButton = true;
        console.log(this.candidateRequisitions);
        this.configureChat();
      }
    }
    });
  }

  private configureChat()
  {
    let user = new ChatUser();

    user.userId = this.candidateInfo.userId;
    user.firstName = this.candidateInfo.firstName;
    user.lastName = this.candidateInfo.lastName;
    let requisition=new ChatRequisition();
    // requisition.requisitionId= this.candidiateRequisition.requisitionID;
    requisition.requisitionId= 0;
    this.chatService.channelType = 1;
    this.chatService.setJoinChat(user, requisition);
  }



}
