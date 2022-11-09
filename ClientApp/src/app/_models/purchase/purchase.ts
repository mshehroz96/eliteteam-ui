export class Purchase {
  purchaseId?: number = 0;
  paymentMethodId?: number = 0;
  companyId?: number = 0;
  serviceId?: number = 0;
  totalAmount?: number = 0;
  purchasedOn?: Date = new Date();
  purchasedByUserId?: number = 0;
  recordStatusLiid?: number = 0;
  orderNo?: number = 0;
  createdOn?: Date = new Date();
  createdBy?: number = 0;
  lastModifiedOn?: Date = new Date();
  lastModifiedBy?: number = 0;
  purchaseReferenceNo?: string;
  purchaseItems: PurchaseItem[] = [];
  purchaseTaxes: PurchaseTax[] = [];
}

export class PurchaseItem {
  purchaseItemId?: number = 0;
  purchaseId?: number = 0;
  purchaseItemLiid?: number = 0;
  itemTitle?: string;
  itemQuantity?: number=0;
  unitRate?: number;
  referenceId?: number=0;
  amount?: number = 0;
  recordStatusLiid?: number = 0;
  orderNo?: number = 0;
  createdOn?: Date = new Date();
  createdBy?: number = 0;
  lastModifiedOn?: Date = new Date();
  lastModifiedBy?: number=0;
}
export class PurchaseTax {
      purchaseTaxId?: number = 0;
      purchaseId?: number= 0;
      taxId?: number = 0;
      amount?: number = 0;
      recordStatusLiid?: number = 0;
      orderNo?: number = 0;
      createdOn?: Date = new Date();
      createdBy?: number = 0;
      lastModifiedOn?: Date = new Date();
      lastModifiedBy?: number=0;
}
