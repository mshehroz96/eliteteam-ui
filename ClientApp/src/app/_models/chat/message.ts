export class Message {
    messageId: number=0;
    directionTypeLiid: number = 466;
    requisitionId?:number|null;
    content: string='';
    toUserId: number=0;
    fromUserId: number=0;
    sentOn: string='';
    readOn: string='';
    isMine: boolean=false;
    timestamp: string='';
    date: string='';
    avatar: string='';
    fromName:string='';
    toName:string='';
    uuid:string='';
    channelType:number=1;
}