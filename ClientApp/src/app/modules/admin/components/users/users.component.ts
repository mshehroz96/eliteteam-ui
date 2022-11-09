import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserOverview } from 'src/app/_models/user/user-overview';
import { UserFilter } from 'src/app/_models/user/userFilter';
import { ComboBox } from 'src/app/_models/common/common';
import { CommonService } from 'src/app/_services/common/common.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUpdateComponent } from 'src/app/_shared/create-update/create-update.component';
import { UserDetailComponent } from 'src/app/_shared/components/user-detail/user-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css'],
})
export class UsersComponent implements OnInit {

  loading: boolean = false;
  users: any[] = [];
  totalRecords: number = 0;
  userType: number = 0;
  userStatus: number = 0;
  searchFilter: string = '';
  closeResult: string = '';
  editMode: boolean;

  userTypes: Array<ComboBox> = [];

  userStatusList: Array<ComboBox> = [];

  usersOverview: UserOverview[] = [
    {
      totalUsers: 0,
      usersList: { usersIDList: [], usersImageList: [], usersNameList: [] },
      userType: '',
    },
  ];
  ref!: DynamicDialogRef;

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private dialogService: DialogService,
  ) {
    this.editMode = false;
    
  }

  ngOnInit(): void {
    this.loading = false;
    this.getUsersOverView();
    this.getUserType();
    this.getUserStatus();
  }

  getUsers(params: UserFilter) {

    params.globalFilter = this.searchFilter;
    params.userType = this.userType;
    params.userStatus = this.userStatus;
    
    this.loading = true;

    this.userService.getUsers(params).subscribe((res) => {
      if (res?.success) {
        this.users = res?.data;  
        this.totalRecords = res?.totalRecords;
        this.loading = false;
      }
    });
  }

  getUsersOverView() {
    this.userService.getUsersOverView().subscribe((res) => {
      if (res?.success) {
        this.usersOverview.splice(0, this.usersOverview.length);
        res.data.reduce((newArr: any, data: any, index: number) => {
          let obj: UserOverview;

          obj = {
            totalUsers: data.totalUsers,
            userType: data.userType == null ? 'Default' : data.userType,
            usersList: {
              usersIDList: data.usersIDList == null ? ['0'] : data.usersIDList.split(','),
              usersImageList: data.usersImageList == null ? ['default.png'] : data.usersImageList.split(','),
              usersNameList: data.usersNameList == null ? ['Not Found'] : data.usersNameList.split(',')
            },
          };

          this.usersOverview.push(obj);
        }, 0);

      }
      // commit check
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        this.getUsers({});
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getUserType() {
    this.commonService.getUserType().subscribe((res: any) => {
      if (res?.success) {
        this.userTypes = res?.data;
      }
    });
  }

  getUserStatus() {
    this.commonService.getUserStatus().subscribe((res: any) => {
      if (res?.success) {
        this.userStatusList = res?.data;
      }
    });
  }
  openAddUser(){
    this.ref = this.dialogService.open(UserDetailComponent, {
      header: 'Add New User',
      data: {
        id:0,
        userTypes: [1,2,3,4,7,8,9,10],
        action:"Add"
      },
      // data: {
      //   id: this.id,
      //   action: 'Add'
      // },
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((template: any) => {
      this.getUsers({});
    });
  }

}
