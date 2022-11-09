import { Purchase, PurchaseItem } from './../../_models/purchase/purchase';
import { PaymentintegrationService } from './../../_services/paymentintegration/paymentintegration.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/core/directive/loading/loading-service/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public config: DynamicDialogConfig,public loadingService: LoadingService,public paymentIntergrationService: PaymentintegrationService,
    private ref: DynamicDialogRef) { }

  paymentMethod:any;
  purchase: Purchase = new Purchase();

  services: any[] = [];
  purchaseItem: PurchaseItem = new PurchaseItem();
  totalAmount: number = 0;
  paymentMethodMessage: string = "";
  ngOnInit(): void {
    // console.log(this.config.data);
    this.getPrimaryPaymentMethod();

    this.services.push( { 'id': 1 , 'title' : 'Unlock Candidate Profile' , description: 'Full access to candidate information and ability to interview & hire them',
                amount : 100});
    this.services.push( { 'id': 2 , 'title' : 'Resume' , description: 'Full access to candidate Resume and ability to interview & hire them',
    amount : 50});

    this.calculateTotalAmount();
  }

  calculateTotalAmount(){
    this.totalAmount = 0;
    this.services.forEach(element => {
      this.totalAmount = this.totalAmount + element.amount;
    });
  }

  getPrimaryPaymentMethod(){
      this.loadingService.doLoading(
        this.paymentIntergrationService.getPrimaryPaymentMethod(), this).subscribe((res) => {
          console.log(res);
          this.paymentMethod = res.data;
          console.log(this.paymentMethod);
          if(this.paymentMethod ==  null){
            this.paymentMethodMessage ="Payment method not found. Please add Payment Method.";
          }
        });
  }
  checkOut(){

    this.purchase.paymentMethodId = this.paymentMethod.paymentMethodId;
    this.purchase.serviceId = 1;

    this.services.forEach(element => {
      this.purchaseItem=  new PurchaseItem()
      this.purchaseItem.amount = element.amount;
      this.purchaseItem.itemTitle = element.title;
      this.purchaseItem.purchaseItemLiid = element.id;
      this.purchaseItem.unitRate = element.amount;
      this.purchaseItem.itemQuantity = 1;
       this.purchase.purchaseItems.push(this.purchaseItem);
    });


    this.loadingService.doLoading(
      this.paymentIntergrationService.stripCheckOut(this.purchase), this).subscribe((res) => {

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
            title: 'Payment Completed!',
            text: "Payment has be done successfully!",
            icon: 'success'
          }).then(() => {
              this.ref.close();
          });
        }

    });

  }

}
