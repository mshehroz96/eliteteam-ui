import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user/user';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';
import { UserDetailComponent } from '../user-detail/user-detail.component';

@Component({
  selector: 'app-user-overview-detail',
  templateUrl: './user-overview-detail.component.html',
  styleUrls: ['./user-overview-detail.component.css']
})
export class UserOverviewDetailComponent implements OnInit {

  @Input() UserData: User;
  @Input() enableUserApproval: boolean = false;
  @Output() refresh = new EventEmitter<string>();

  closeResult: string = '';
  ref!: DynamicDialogRef;
  userId!:number;
  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private route: ActivatedRoute)  {
    this.UserData = new User();
  }

  ngOnInit(): void {
    this.userId =this.route.snapshot.params['id'];
  }

  editUser() {
    this.ref = this.dialogService.open(UserDetailComponent, {
      header: 'Edit User',
      data: {
        id: this.UserData.userId,
        action:"Edit"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res: any) => {
      if (res) {
        this.refresh.emit('test');
      }
    });
  }
  

  BlockUser(event: any) {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will not be able to login to the system!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block User!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserData.lastModifiedBy = this.userService.getLoggedInUserDetail().userId;
        this.userService
          .blockUser(this.userId)
          .subscribe((res: any) => {
            if(res?.success){
              Swal.fire(
                'Blocked!',
                 res?.message,
                'success'
              );
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
    });
  }

  ApprovekUser(event: any) {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to active this user!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve User!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserData.lastModifiedBy = this.userService.getLoggedInUserDetail().userId;
        this.userService
          .approveUser(this.UserData)
          .subscribe((res: any) => {
            Swal.fire(
              'Activated!',
              'User has been activated successfully.',
              'success'
            ).then(res => {
              this.refresh.emit('test');
            });
          });
      }
    });
  }
}

