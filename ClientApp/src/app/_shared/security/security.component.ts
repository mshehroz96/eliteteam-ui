import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NG_VALIDATORS,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserChangePassword } from 'src/app/_models/user/user';
import Swal from 'sweetalert2';
import { PasswordValidator } from 'src/app/_helper/password-validator';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {
  
  @Input() userId: number = 0;
  userChangePassword!: UserChangePassword;

  UserForm = new FormGroup(
    {
      currentPassword: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    [PasswordValidator.MatchValidator('password', 'confirmPassword')]
  );

  constructor(
    private route: ActivatedRoute,
    private authenticationService:AuthenticationService) 
    {
    this.userChangePassword = new UserChangePassword();
    this.userChangePassword.userId = this.userId;
    
    }

  ngOnInit(): void {
    
  }

  saveData() {
    if (this.UserForm.invalid) {
      return;
    } 

    this.userChangePassword = Object.assign(this.userChangePassword,this.UserForm.value);
    
    this.authenticationService.changePassword(this.userChangePassword).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          title: 'Success',
          text: 'User password has been updated successfully.',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: res.message,
          icon: 'error',
        });
      }
    });
  }

  get PasswordValidator() {
    return this.UserForm.controls;
  }

  get passwordMatchError() {
    return (
      this.UserForm.getError('mismatch') && this.UserForm.get('confirmPassword')
    );
  }

}
