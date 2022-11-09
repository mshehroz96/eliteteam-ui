import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { LIST_TYPES } from 'src/app';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { DialCode } from 'src/app/_models/user/dial-code';
import { User } from 'src/app/_models/user/user';
import { AuthenticationService, CommonService } from 'src/app/_services';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  languages: any[] = [];
  selectedItems: any[] = [];
  userTypes: any[] = [];
  allowedUserTypes: number[] = [];
  CountryCodeList: any[];
  ShowFilter = false;
  limitSelection = false;
  dropdownSettings: any = {};
  CountryCode: string = 'Code';
  action:string = "";
  currentUser:number;
  domain?:string = "";
  UserForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    userStatus: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    // password: new FormControl('', Validators.required),
    // confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    public loadingService: LoadingService,
    private commonService: CommonService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public auth: AuthenticationService
  ) {
    this.currentUser = this.auth.currentUserValue.userType;
    this.user = new User();


    this.CountryCodeList = new DialCode().DialCodeList;

  }

  ngOnInit(): void {
    this.user.userId = Number(this.config.data.id);
    if (this.config.data.userTypes) {
      this.allowedUserTypes = this.config.data.userTypes;
    }
    if (this.user.userId > 0) {
      this.getUser(this.user.userId);
    } 
    if (this.config.data.action) {
      this.action = this.config.data.action;
    }
    this.toggleControl();
    this.getUserTypes();
    this.getLanguages();
    if(this.auth.currentUserValue.companyDomain){
      this.domain = "@" + this.auth.currentUserValue.companyDomain.split('www')[1].substring(1);

    }
  }
  getLanguages() {
    this.commonService.getListItems(LIST_TYPES.LANGUAGES).subscribe((res: any) => {
      if (res.success) {
        this.languages = res.data;
        this.user.language =  [145];
      }
    });
  }
  getUser(userId: number) {
    this.loadingService.doLoading(
      this.userService.getUser(userId), this
    ).subscribe((res) => {
      if (res?.success) {
        this.user = res?.data;
      }
    });
  }

  closeModal(): void {
    this.ref.close(this.user);
  }

  saveData() {
    if (this.UserForm.valid) {
      if (this.user.userId == 0) {
        this.saveUser();
      } else {
        this.updateUser();
      }
    }
  }

  private saveUser() {
    if(this.action == "Add"){
      this.user.userStatus = 1;
    }
    if(this.currentUser == 5){
      this.user.userType = 6;
    }
    this.loadingService.doLoading(
      this.userService
        .createUser(this.user), this)
      .pipe(first())
      .subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: 'User information has been saved successfully.',
            icon: 'success',
          }).then((result) => {
            this.ref.close({});
          });

        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          }).then((result) => {

          });
        }
      });

  }

  private updateUser() {
    this.loadingService.doLoading(
      this.userService
        .updateUser(this.user), this)
      .pipe(first())
      .subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: 'User information has been saved successfully.',
            icon: 'success',
          });

          this.ref.close({});

        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          });
        }
      });

  }

  private getUserTypes() {
    this.commonService.getUserType().subscribe((res: any) => {
      if (res.success) {
        if (this.allowedUserTypes.length > 0)
          this.userTypes = res.data.filter((x: any) => this.allowedUserTypes.includes(x.value));
        else
          this.userTypes = res.data;
      }
    });
  }

  Cancel() {
    this.closeModal();
  }

  toggleControl() {
    if (this.user.userId != 0) {
      this.UserForm.removeControl('password');
      this.UserForm.removeControl('confirmPassword');
    }
    if(this.action == 'Add'){
      this.UserForm.removeControl('userStatus');
    }
    if(this.currentUser == 5){
      this.UserForm.removeControl('userType');
    }
    if(this.currentUser != 5){
      this.UserForm.controls['email'].setValidators(Validators.email)
    }
    
  }
}

