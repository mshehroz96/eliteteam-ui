export class BillingDetails {
  userId: number=0;
  billingName: string="";
  billingEmail: string="";
  billingTaxID: string="";
  billingVAT: string="";
  billingMobileNo: string="";
  billingCountry: string="";
  billingAddress: string="";
  billingState: string="";
  billingZipCode: string="";
}

export class PaymentMethod {
  CompanyPlan: string="";
  paymentType: string = "";
  paymentMethodId: number = 0;
  cardType: string = "";
  companyId?: number = 0;
  cardNo?: string = "";
  name?: string= "";
  cvv?: number;
  stripeCardId?: string;
  isPrimary?: boolean;
  recordStatusLiid?: number = 0;
  isDefaultShowcase?:boolean = false;
  orderNo? : number = 0;
  expiryMmyy?: string;
  createdOn?: Date = new Date();
  lastModifiedOn?: Date = new Date();
  createdBy?: number = 0;
  lastModifiedBy?: number = 0;
  stripeCustomerId?: string = "";
  customerName?: string = "";
  customerDescription?: string = "";
  customerEmail?: string = "";
}

export class paymentMethodInputDto {
    companyId?: number = 0;
      paymentMethodId?: number = 0;
     stripeCardId?: string;
     stripeCustomerId?: string;
}
