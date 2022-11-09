export class User {
    userId: number=0;
    firstName: string='';
    lastName: string='';
    email: string='';
    mobileNo: string='';
    userTypeStr: string='';
    userType: number=0;
    userStatus: number=0;
    accessToken: string='';
    avatarFileName: string='';
    password: string = '';
    confirmPassword: string = '';
    language:any[]=[];
    createdOn!:Date
    createdBy:number=-1;
    companyId:number=0;
    lastModifiedOn!:Date
    lastModifiedBy:number=-1;
    usertypeDescription:string = "";
    planType?:string;
    planTypeValue?:number;
    companyDomain?:string = "";
    companyName?:string = "";
    companyAddress?:string="";

}
export class UserChangePassword
{
    userId: number = 0;
    currentPassword: string = '';
    password: string = '';
    confirmPassword: string = '';
}
