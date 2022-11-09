export class ChatUser
{
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';
    fullName:string='';
    avatarFileName: string = '';
    userType: string = '';
    orderNo: number=1;
    unReadMessages:number=0;
    requisitionId:number=0;
}

export class ChatRequisition 
{
    requisitionId:number=0;
    companyName:string='';
    companyId:number=0;
    jobTitle:string='';
    campaignType:string='';
    companyLogo:string='';
    candidates: ChatUser[]=[];
    collapsed:boolean=true;
    cssClass:string='bx-plus';
    unReadMessages: number = 0;
}