import { PaymentintegrationService } from './../../../../../_services/paymentintegration/paymentintegration.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingDetails ,PaymentMethod, paymentMethodInputDto} from 'src/app/_models/client/BillingDetails';
import { BillingDetailsRequest } from 'src/app/_models/client/BillingDetailsRequest';
import { AuthenticationService } from 'src/app/_services';
import { ClientService } from 'src/app/_services/client/client.service';
import { CommonService } from 'src/app/_services/common/common.service';
import { UserService } from 'src/app/_services/user/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'setting-billing-details',
  templateUrl: './setting-billing-details.component.html',
  styleUrls: ['./setting-billing-details.component.css']
})
export class SettingBillingDetailsComponent implements OnInit {
  userType:number = 0;
  planType:string;
  uuid: number = 0;
  clientIndustries: any[] = [];
  billingDetails: BillingDetails = new BillingDetails();
  paymentMethod:PaymentMethod=new PaymentMethod();
  billingDetailsRequest: BillingDetailsRequest = new BillingDetailsRequest();
  loading = false;
  error = '';
  ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
  //data: RegisterpageData = new RegisterpageData();
  //strCompanyLogoURL: string = "";
  //updateBillingDetailsRequest: UpdateBillingDetailsRequest = new UpdateBillingDetailsRequest(); //TODO:probably not used, remove it
  isLoading_updateBillingDetails: boolean = false;
  isLoading_SavePaymentMethod: boolean = false;
  selectedValue :any ='S';
  paymentMethods:any[] = [];
  paymentMethodInputDto: paymentMethodInputDto = new paymentMethodInputDto();

  constructor(
    private clientService: ClientService,
    private readonly commonService: CommonService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private paymentIntegrationService: PaymentintegrationService

  ) {
    this.planType = "";
  }

  ngOnInit(): void {
    /*this.userService.getRegisterPageData().subscribe((response) => {
      this.data = response.data;
      this.loading = false;
    },
      error => {
        this.loading = false;
      });*/
    this.userType = this.authService.currentUserValue.userType;
    if(this.authService.currentUserValue.planType){
      this.planType = this.authService.currentUserValue.planType;
    }

    this.getBillingDetails();
    this.getPaymentMethods();
  }

  getPaymentMethods(){
    this.paymentIntegrationService.getPaymentMethods()
    .subscribe((res: any) => {
        this.paymentMethods = res?.data;
    });
  }

  // getCardImage(item:any):any{
  //     if(item.cardType == 'visa'){
  //       return "../assets/img/icons/payments/visa.png"
  //     }
  //     else if(item.cardType == 'mastercard'){
  //       return '../assets/img/icons/payments/mastercard.png';
  //     }
  // }

  cancelPayment(){
    this.paymentMethod = new PaymentMethod();
  }

  deletePaymentMethod(item:any){

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to delete this card?",
      icon: 'question',
      showCancelButton: true,
      customClass: { confirmButton:"disqualify"},
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {

        this.isLoading_SavePaymentMethod = true;
        this.paymentMethodInputDto.paymentMethodId = item.paymentMethodId;
        this.paymentIntegrationService.deletePaymentMethod(this.paymentMethodInputDto)
        .subscribe((res: any) => {
          this.isLoading_SavePaymentMethod = false;
          console.log(res);
          if(res.success == false){
            Swal.fire({
              title: 'Error!',
              text: res?.data,
              icon: 'error'
            }).then(() => {

            });
          }
          if(res?.success){
            Swal.fire({
              title: 'Success',
              text: "Payment Method Deleted successfully",
              icon: 'success'
            }).then(() => {
              this.getPaymentMethods();
            });
          }

        });
      }
    });



  }

  savePayment(){

    this.isLoading_SavePaymentMethod = true;
    this.paymentIntegrationService.savePaymentMethod(this.paymentMethod)
    .subscribe((res: any) => {
      this.isLoading_SavePaymentMethod = false;
      console.log(res);
      if(res.success == false){
        Swal.fire({
          title: 'Payment Method Error!',
          text: res?.data,
          icon: 'error'
        }).then(() => {

        });
      }
      if(res?.success){
        Swal.fire({
          title: 'Payment Method!',
          text: "Payment Method Added successfully",
          icon: 'success'
        }).then(() => {
          this.cancelPayment();
          this.getPaymentMethods();
        });
      }

    });
  }

  markAsPrimary(item:any){

    Swal.fire({
      title: 'Confirm Deletion',
      text: "Are you sure you want to marked this card as primary?",
      icon: 'question',
      showCancelButton: true,
      customClass: { confirmButton:"disqualify"},
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.paymentMethodInputDto.paymentMethodId = item.paymentMethodId;
        this.paymentIntegrationService.markAsPrimary(this.paymentMethodInputDto)
        .subscribe((res: any) => {
          if(res?.success){
            Swal.fire({
              title: 'Success',
              text: "Payment Method Updated!",
              icon: 'success'
            }).then(() => {
              this.getPaymentMethods();
            });
          }
        });

        this.loading = false;
      }
    });
  }

  updateBillingDetails() {
    this.isLoading_updateBillingDetails = true;
    this.billingDetails.billingCountry = this.billingDetails.billingCountry.toString(); //TODO:because wrongly defined in DB as string, should be int in DB
    this.clientService.updateBillingDetails(this.billingDetails)
      .subscribe((res: any) => {
        this.isLoading_updateBillingDetails = false;

        Swal.fire({
          title: 'Billing Information Updated',
          text: "Company Billing Information has been updated successfully",
          icon: 'success'
        }).then(() => {

        });
      });
  }


  getBillingDetails() {
    this.clientService.getBillingDetails(this.billingDetailsRequest).subscribe((res) => {
      if (res?.success) {
        this.billingDetails = res.data;


      }
    })
  }


}
