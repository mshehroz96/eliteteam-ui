import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';
import { Register } from 'src/app/_models/user/register';
import { RegisterpageData } from 'src/app/_models/common/common';
import Swal from 'sweetalert2';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import { ClientDetail } from 'src/app/_models/client/client';

@Component({
  templateUrl: 'self-register.component.html',
  styleUrls: ['self-register.component.css']
})
export class SelfRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  returnUrl: string = '';
  client: ClientDetail;
  error = '';
  matchingCompanies: any[] = [];
  data: RegisterpageData = new RegisterpageData();
  get f() { return this.registerForm.controls; }
  constructor(
    public loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) {

    this.client = new ClientDetail();
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyWebsite: ['', [Validators.required, Validators.pattern('(http|https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]/*?')]],
      industry: ['', Validators.required],
      address: ['', Validators.required],
      noOfEmployees: ['', Validators.required],
      titleLiid: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phoneNumber: ['', Validators.required],
      cellNumber: ['', Validators.required],
      ext: ['', Validators.required],
      zipCode: ['', Validators.required],
      createNewCompany: [false],
      companyId: [0],
    });

    this.loadingService.doLoading(
      this._userService.getRegisterPageData(),this
    )
    .subscribe((response) => {
      this.data = response.data;
    });
  }

  submit(companyId:number) {

    this.client = Object.assign(this.client, this.registerForm.value);
    
    this.client.companyId=companyId;

    this.loadingService.doLoading(
      this._userService.selfRegister(this.client),this
    )
    .subscribe((response) => {
        if (response.success) {
          if(this.client.companyId>0)
          {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'We have sent an email to your Company Administrator. Once they approve your request, you will receive and email and then you will be able to login to the system.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then(()=>{
              this.router.navigate(['/auth/login']);
            });
          }
          else {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful',
              text: 'Your company has been registered successfully. Please activate your account by clicking the link sent to your email address. ',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            }).then((result) => {
              this.router.navigate(['/auth/login']);
            });
          }
        }
        if (!response.success && response.message) {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
          })
        } else {
          this.matchingCompanies = response.data ?? [];
        }
    });
  } 
}
