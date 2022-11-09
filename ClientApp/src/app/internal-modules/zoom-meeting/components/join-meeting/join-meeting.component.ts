import { EventService } from './../../../../_services/event/event.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { KJUR } from 'jsrsasign';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.component.html',
  styleUrls: ['./join-meeting.component.css']
})
export class JoinMeetingComponent implements OnInit {

  meetingRequest: any = {};
  _eventId:number=0;
  _start:boolean=false;

  @Input("eventId") 
  set eventId(value:number)
  {
      this._eventId=value;
  }
  get eventId() {
    return this._eventId;
  }
  eventData: any;
  sdkKey: string = '';
  sdkSecret: string = '';
  constructor(private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router, private eventService: EventService) { }
  

  ngOnInit() {
    this.getEventData();
  }


  getEventData()
  {
    this.eventService.getEventById(this.eventId)
      .subscribe((res: any) => {
        this.eventData = res.data.eventData;
        this.sdkKey = res.data.zoomConfig.sdkKey;
        this.sdkSecret = res.data.zoomConfig.sdkSecret;
        this.meetingRequest = {
          sdkKey: this.sdkKey,
          meetingNumber: this.eventData.meetingNumber,
          role: 0,
          leaveUrl: 'http://localhost:4200',
          userName: this.authenticationService.currentUserValue.firstName + ' ' + this.authenticationService.currentUserValue.lastName,
          userEmail: this.authenticationService.currentUserValue.email,
          passWord: this.eventData.passCode,
          registrantToken: ''
        };

        this.startMeeting();
      });
  }

  createSignature(): string {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2

    const oHeader = { alg: 'HS256', typ: 'JWT' }

    const oPayload = {
      sdkKey: this.sdkKey,
      mn: this.meetingRequest.meetingNumber,
      role: this.meetingRequest.role,
      iat: iat,
      exp: exp,
      appKey: this.sdkSecret,
      tokenExp: iat + 60 * 60 * 2
    }

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, this.sdkSecret)

    return signature;

  }


  startMeeting() {


    const client = ZoomMtgEmbedded.createClient();

    let meetingSDKElement = document.getElementById('meetingSDKElement') ?? undefined;

    

    client.init({
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
          viewSizes: {
            default: {
              width: 500,
              height: 200
            },
            ribbon: {
              width: 300,
              height: 200
            }
          }
        }
      }
    })

    let signature = this.createSignature();

    console.log(signature);

    client.join({
      signature: signature,
      meetingNumber: this.meetingRequest.meetingNumber,
      userName: this.meetingRequest.userName,
      sdkKey: this.meetingRequest.sdkKey,
      userEmail: this.meetingRequest.userEmail,
      password: this.meetingRequest.passWord,
      tk: this.meetingRequest.registrantToken,
    }).then((res) => {

    });

  }

}
