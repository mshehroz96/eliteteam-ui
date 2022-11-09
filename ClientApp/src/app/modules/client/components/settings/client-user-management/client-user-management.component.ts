import { Component, OnInit } from '@angular/core';
import { UserOverview } from 'src/app/_models/user/user-overview';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/_services/user/user.service';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { UserFilter } from 'src/app/_models/user/userFilter';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailComponent } from 'src/app/_shared/components/user-detail/user-detail.component';

@Component({
  selector: 'app-client-user-management',
  templateUrl: './client-user-management.component.html',
  styleUrls: ['./client-user-management.component.css']
})
export class ClientUserManagementComponent implements OnInit {

  data:any[]=[];
  searchFilter:string='';
  loading:boolean=false;
  totalRecords:number=0;
  noRecord:boolean = false;


  usersOverview: UserOverview[] = [
    {
      totalUsers: 0,
      usersList: { usersIDList: [], usersImageList: [], usersNameList: [] },
      userType: '',
    },
  ];


  constructor(
    private userService: UserService,
    private readonly authenticationService: AuthenticationService,
    
    public dialogService: DialogService) { }

  ref!: DynamicDialogRef;

  ngOnInit(): void {
    
  }

  getData(params:UserFilter)
  {
    params.globalFilter=this.searchFilter;

    this.loading=true;
    this.userService.getUsers(params).subscribe((res) => {
      if (res?.success) {
        this.data=res.data;
        this.totalRecords=res.totalRecords;
        this.loading = false;
      }
    });
  }
  addUser() {
    this.ref = this.dialogService.open(UserDetailComponent, {
      header: 'Add New User',
      data: {
        id:0,
        userTypes: [6],
        action:"Add"
      },
      width: '50%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((res: any) => {
      if (res) {
        this.getData({});
      }
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
          this.getData({});
      }
    });
  }  
}
