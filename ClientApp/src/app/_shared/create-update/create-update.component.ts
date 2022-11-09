import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { first } from 'rxjs';
import { DialCode } from 'src/app/_models/user/dial-code';
import { User } from 'src/app/_models/user/user';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
})
export class CreateUpdateComponent implements OnInit {
  user!: User;
  LanguageList: Array<{ item_text: string, item_id: number }> = [];
  selectedItems: Array<{ item_id: number; item_text: string }> = [];
  UserTypeList: Array<{ listItemID: number; title: string }> = [];
  CountryCodeList: any[];
  ShowFilter = false;
  limitSelection = false;
  dropdownSettings: any = {};
  CountryCode: string = 'Code';
  @Input() EditMode: boolean=false;
  @Input() defaultUserType: number = -1;
  ref!: DynamicDialogRef;

  UserForm = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    userStatus: new FormControl('', Validators.required),
    userType: new FormControl(this.defaultUserType == -1 ? '' : this.defaultUserType, Validators.required),
    language: new FormControl('', Validators.required),
    mobileNo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private modalService: NgbModal,
    private dialogService: DialogService,
  ) {
    this.user = new User();
    
    if(this.defaultUserType == -1){
      this.UserForm.patchValue({
        userType: this.defaultUserType
     });
    }
    this.userService.getLanguages().subscribe((res: any) => {
      if (res.success) {
        this.LanguageList = res.data;
        console.log(this.LanguageList);
      }
    });
    this.CountryCodeList = new DialCode().DialCodeList;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter,
    };
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.user.userId = id == null ? 0 : parseInt(id);

    if (this.user.userId != 0 && this.user.userId != null) {
      this.getUser(this.user.userId);
    }

    this.ToggleControl();

    this.LoadUserTypeList();
  }

  getUser(userId: number) {
    this.userService.getUser(userId).subscribe((res) => {
      //console.log(res);
      if (res?.success) {
        this.user = res?.data;
        this.setExistingData(this.user);
      }
    });
  }

  private setExistingData(userData: User) {
    this.selectedItems = userData.language;
    this.CountryCode = userData.mobileNo.split('-')[0];
    this.user.userId-userData.userId;

    console.log(userData);

    this.UserForm.patchValue({
      lastName: userData.lastName,
      firstName: userData.firstName,
      email: userData.email,
      userStatus: userData.userStatus,
      userType: userData.userType,
      language: this.selectedItems,
      mobileNo: userData.mobileNo.split('-')[1],
    });
  }

  saveData() {
    var aa = this.UserForm.get("language")?.value;
    if (this.UserForm.invalid) {
      return;
    } else if (this.CountryCode == null || this.CountryCode == 'Code') {
      this.document.getElementById('CountryCode')?.focus();
      return;
    } else {
      if (this.user.userId==0) {
        this.saveUser();
      } else {
        this.updateUser();
      }
    }
  }

  private saveUser() {

    this.user = this.UserForm.value;
    this.user.mobileNo = this.CountryCode + '-' + this.UserForm.value.mobileNo;
    var LoggedInUserDetail = this.userService.getLoggedInUserDetail();
    this.user.createdBy = LoggedInUserDetail.userId;
    this.user.companyId = LoggedInUserDetail.companyId;
    if (this.defaultUserType != -1)
      this.user.userType = this.defaultUserType;
      
    this.userService
      .createUser(this.user)
      .pipe(first())
      .subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: 'User information has been saved successfully.',
            icon: 'success',
          }).then((result) => {
            this.closeModal();
          });
          //this.router.navigate(['/users']);
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          }).then((result) => {
            this.modalService.dismissAll('Closed');
          });
        }
      });

  }
  closeModal(): void {
    this.ref.close(this.user);
  }

  private updateUser() {
    //this.user = this.UserForm.value;
    this.user.firstName = this.UserForm.value.firstName;
    this.user.lastName = this.UserForm.value.lastName;
    this.user.email = this.UserForm.value.email;
    this.user.userStatus = this.UserForm.value.userStatus;
    this.user.userType = this.UserForm.value.userType;
    this.user.language = this.UserForm.value.language;
    this.user.mobileNo = this.CountryCode + '-' + this.UserForm.value.mobileNo;
    var LoggedInUserDetail = this.userService.getLoggedInUserDetail();
    this.user.lastModifiedBy = LoggedInUserDetail.userId;
    this.user.companyId = LoggedInUserDetail.companyId;
    this.userService
      .updateUser(this.user)
      .pipe(first())
      .subscribe((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Success',
            text: 'User information has been saved successfully.',
            icon: 'success',
          });
          // this.router.navigate(['/users']);
        } else {
          Swal.fire({
            title: 'Error',
            text: res.message,
            icon: 'error',
          });
        }
      });

  }

  private LoadUserTypeList() {
    this.userService.getUserTypeList().subscribe((res: any) => {
      if (res.success) {
        res.data.map((data: any) => {
          this.UserTypeList.push({ listItemID: data.listItemID, title: data.title });
        });
      }
    });
  }

  onItemSelect(item: any) {
    //console.log('onItemSelect', item);
  }

  SetCode(event: any) {
    event.preventDefault();
    if (event.target.name == 0) {
      this.CountryCode = 'Code';
    } else {
      this.CountryCode = event.target.name;
    }
  }

  Cancel() {
    this.modalService.dismissAll('Cancelled');
  }

  ToggleControl() {
    if (this.user.userId != 0) {
      this.UserForm.removeControl('password');
      this.UserForm.removeControl('confirmPassword');
    }
  }
}
