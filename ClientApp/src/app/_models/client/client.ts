export class ClientList {
  companyId: number = 0;
  logoFileName: string = "";
  companyName: string = "";
  industry: string = "";
}

export class ClientDetail {
  companyName: string='';
  companyId: number=0;
  companyWebsite: string='';
  industry?:number;
  address:string='';
  noOfEmployees?: string;
  titleLiid?: number;
  firstName: string='';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  ext: string = '';
  cellNumber: string = '';
  createNewCompany: boolean=false;
  password: string = '';
  zipCode: string = '';
}

