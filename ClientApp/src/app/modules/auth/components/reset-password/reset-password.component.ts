import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { User } from 'src/app/_models/user/user';
import { AuthenticationService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token:string='';
  user:User;
  resetPasswordForm!: FormGroup;
  showForm:boolean=true;
  get f() { return this.resetPasswordForm.controls; }
  constructor(
    public loadingService:LoadingService,
    private authenticationService:AuthenticationService,
    private router:Router,
    public route:ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { 
      this.user=new User();
      this.token=route.snapshot.params["token"];
    
    }

  verifyToken()
  {
    this.loadingService.doLoading(
      this.authenticationService.verifyToken(this.token),this
    ).subscribe((res)=>
    {
      if(res.success)
      {
        this.user=res.data;
      }
      
      if (this.user.userId == 0) {
        this.showForm = false;
      }
    })
  }
  ngOnInit() {

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.verifyToken();

  }

  resetPassword()
  {
    this.user.password = this.f.password.value;
    this.user.confirmPassword=this.f.confirmPassword.value;

    this.loadingService.doLoading(
      this.authenticationService.resetPassword(this.user,this.token),this
    ).subscribe((res)=>
    {
        if(res.success)
        {
          Swal.fire({
            icon: 'success',
            title: 'Password Set',
            text: 'You have set your password successfully. You can now login using this password.',
          });

          this.router.navigate(['/auth/login']);
        }
    });
  }
}
