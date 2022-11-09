import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { AuthenticationService } from 'src/app/_services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  get f() { return this.forgotPasswordForm.controls; }


  DefaultEmail:string='';

  constructor(public loadingService: LoadingService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder) { 

    }

  ngOnInit() {

    if (this.route.snapshot.queryParams["email"])
      this.DefaultEmail = this.route.snapshot.queryParams["email"]
    this.forgotPasswordForm = this.formBuilder.group({
      email: [this.DefaultEmail, Validators.required]
    });
  }

  sendResetLink()
  {
    this.loadingService.doLoading(
      this.authenticationService.forgotPassword(this.f.email.value), this
    ).subscribe((res) => {
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Forgot Password',
          text: 'Reset password link has been sent to your email address',
        });

        this.router.navigate(['/auth/login']);
      }
    });
  }
}
