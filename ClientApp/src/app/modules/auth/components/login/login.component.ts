import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';


@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = '';
  isPwd = true;

  constructor(
    public loadingService:LoadingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loadingService.doLoading(
    this.authenticationService.login(this.f.username.value, this.f.password.value),this)
      .pipe(first())
      .subscribe(res => {
        if (res.success) {

          switch (res.data.userType) {
            case 1:
              this.router.navigate(['/admin/dashboard']);
              break;
            case 2:
              this.router.navigate(['/recruiter/dashboard']);
              break;
              case 3:
              this.router.navigate(['/recruiter/dashboard']);
              break;
            case 4:
              this.router.navigate(['/jobpost/dashboard']);
              break;
            case 5:
              this.router.navigate(['/client/dashboard']);
              break;
              case 6:
              this.router.navigate(['/client/dashboard']);
              break;
            case 7:
              this.router.navigate(['/candidate/dashboard']);
              break;
            case 8:
              this.router.navigate(['/external-interviewer/dashboard']);
              break;
            case 9:
              this.router.navigate(['/prospect-client/dashboard']);
              break;
            case 10:
              this.router.navigate(['/visitor/dashboard']);
              break;
            default:
              this.router.navigate(['/']);
          }
        }
        else {
          this.error = res.message;
          this.loading = false;
        }
      },
        error => {

          if(error.error)
          {
            this.error = error.error.message;
          }
          else
          {
            this.error = error.message;
          }
          this.loading = false;
        }
      );
  }
}
