import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { AuthenticationService, UserService } from 'src/app/_services';
import { CommonService } from 'src/app/_services/common/common.service';
import { RegisterpageData } from 'src/app/_models/common/common';
import Swal from 'sweetalert2';
import { FILES_PATHS } from 'src/app';
import { UserDetails } from 'src/app/_models/user/UserDetails';
import { UserDetailsRequest } from 'src/app/_models/user/UserDetailsRequest';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { User } from 'src/app/_models/user/user';
import { collectFromHash } from '@fullcalendar/core';
@Component({
  selector: 'shared-settings-personal',
  templateUrl: './settings-personal.component.html',
  styleUrls: ['./settings-personal.component.css']
})
export class SettingsPersonalComponent implements OnInit {
  @Input() userId: number | undefined;
  @ViewChild('imgUserAvatar') imgUserAvatar!: FileUpload;
  uuid: number = 0;
  clientIndustries: any[] = [];
  userDetails: UserDetails = new UserDetails();
  userDetailsRequest: UserDetailsRequest = new UserDetailsRequest();
  loading = false;
  error = '';
  data: RegisterpageData = new RegisterpageData();
  strUserAvatarURL: string = "";
  isLoading_updateUserDetails: boolean = false;
  isCurrentUser:boolean = true;
  isCandidateUser:boolean = false;
  userType?:number = 0;
  acCheck?:boolean = true;
  currentUser!:User;
  constructor(
    private authenticationService:AuthenticationService,
    private userService: UserService,
    public loadingService:LoadingService,
    private readonly commonService: CommonService,
    private route: ActivatedRoute) {
      
      
  }
  ngOnInit(): void {
    this.userType = this.authenticationService.currentUserValue.userType;
    //TODO: check what is this doing here? needed?
    this.userService.getRegisterPageData().subscribe((response) => {
      this.data = response.data;
      this.loading = false;
    },
      error => {
        this.loading = false;
      });
      if(this.userId){
        this.userId = this.userId;
        this.isCurrentUser = false;
      }
      else{
        this.userId = this.authenticationService.currentUserValue.userId;
        this.isCurrentUser = true;
      }

    this.getUserDetails();
    this.currentUser = {
      userId:0,
      firstName:'',
      lastName:'',
      email:'',
      mobileNo: '',
      userTypeStr:'',
      userType:0,
      userStatus: 0,
      accessToken:'',
      avatarFileName:'',
      password: '',
      confirmPassword:'',
      language:[],
      createdOn:new Date(),
      createdBy:-1,
      companyId:0,
      lastModifiedOn:new Date(),
      lastModifiedBy:-1,
      usertypeDescription:"",
      planType:"",
      planTypeValue:0,
      companyDomain:"",
      companyName: "",
    };
  }
  uploadUserAvatar() {
    if (this.imgUserAvatar._files.length > 0) {
      this.loadingService.doLoading(
      this.commonService.uploadFile(this.imgUserAvatar._files[0],FILES_PATHS.UPLOAD_AVATARS),this)
        .subscribe((res: any) => {
          this.userDetails.avatarFileName = res?.data.uri.split("/").pop();
          this.strUserAvatarURL = FILES_PATHS.MAP_USER_AVATARS(this.userDetails.avatarFileName);
          this.loading = false;
        });
    }
  }
  updateUserDetails() {
    this.isLoading_updateUserDetails = true;
   
    let user : UserDetails = {
      titleLiid: this.userDetails.titleLiid,
      userId: this.userDetails.userId,
      firstName: this.userDetails.firstName,
      lastName: this.userDetails.lastName,
      email: this.userDetails.email,
      mobileNo: this.userDetails.mobileNo,
      landLineNo: this.userDetails.landLineNo,
      extensionNo: this.userDetails.extensionNo,
      avatarFileName: this.userDetails.avatarFileName,
      userType: this.userDetails.userType
    }
    this.userService.updateUserDetails(user)
      .subscribe((res: any) => {
        this.isLoading_updateUserDetails = false;

        Swal.fire({
          title: 'User Updated',
          text: "User details were updated successfully",
          icon: 'success'
        }).then(() => {
          
        });
        if(this.isCurrentUser){
          this.getCurrentUserDetailByEmail();
        }
      });
  }
  getCurrentUserDetailByEmail(){
    
    this.userService.getCurrentUserDetailByEmail(this.userDetails.email)
      .subscribe((res: any) => {
        if(res?.success){
          this.authenticationService.currentUserValue.avatarFileName = FILES_PATHS.MAP_USER_AVATARS(res.data.avatarFileName);
          this.authenticationService.currentUserValue.firstName = res.data.firstName;
          this.authenticationService.currentUserValue.lastName = res.data.lastName;

          this.currentUser.accessToken = this.authenticationService.currentUserValue.accessToken;
          this.currentUser.userId = this.authenticationService.currentUserValue.userId;
          this.currentUser.firstName = res.data.firstName + " " + res.data.lastName;
          this.currentUser.email = this.authenticationService.currentUserValue.email;
          this.currentUser.avatarFileName = res.data.avatarFileName;
          this.currentUser.userStatus = this.authenticationService.currentUserValue.userStatus;
          this.currentUser.userType = this.authenticationService.currentUserValue.userType;
          this.currentUser.userTypeStr = this.authenticationService.currentUserValue.userTypeStr;
          this.currentUser.companyId = this.authenticationService.currentUserValue.companyId;
          this.currentUser.usertypeDescription = this.authenticationService.currentUserValue.usertypeDescription;
          this.currentUser.planType = this.authenticationService.currentUserValue.planType;
          this.currentUser.planTypeValue = this.authenticationService.currentUserValue.planTypeValue;
          this.currentUser.companyDomain = this.authenticationService.currentUserValue.companyDomain;
          this.currentUser.companyName = this.authenticationService.currentUserValue.companyName;
         
          window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.authenticationService.currentUserSubject.next(this.currentUser);
          this.authenticationService.currentUser.next(this.currentUser);
        }
      });
  }
  userDetailsLoader : boolean = false;
  getUserDetails() {
    this.userDetailsLoader =  true;
    if(this.userId){
      this.userId = this.userId;
    }
    else{
      this.userId = this.authenticationService.currentUserValue.userId;
    }

    this.loadingService.doLoading(
    this.userService.getUserDetail(this.userId),this)
    .subscribe((res) => {
      this.loading = false;
      if (res?.success) {
        this.userDetails = res.data;
        this.strUserAvatarURL = FILES_PATHS.MAP_USER_AVATARS(this.userDetails.avatarFileName);
        this.loading = false;
        if(this.userDetails.userType == 7){
          this.isCandidateUser = true;
        }
      }
    });
    
  }
  deactivateUserAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to deactivate you account this can not be undone!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deactivateUserAccountConfirmed();
      }
    });
  }
  deactivateUserAccountConfirmed(){
    this.userService.deactivateUserAccount(Number(this.authenticationService.currentUserValue.userId))
    .subscribe((res) => {
      this.loading = false;
      if (res?.success) {
        Swal.fire({
          title: 'Account Deactivation',
          text: res?.message,
          icon: 'success'
        }).then(() => {
          
        });
      }
      else{
        Swal.fire({
          title: 'Account Deactivation',
          text: res?.message,
          icon: 'error',
        });
      }
    });
  }
  checkCheckBoxValue(event: any){
    this.acCheck = !event.target.checked;
  }



}
