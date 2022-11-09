import { ScreeningQuestion } from "./screening-question";

export class RequisitionRequest
{
    uuid:string='';
    isDraft:boolean=false;
    companyId:number=0;
    requisitionId:number=0;
    campaignType: string = '';
    interviewTypeSlotCount:number=0;
    profilesRequired:number=0;
    availabilityDateFrom?: Date;
    availabilityDateTo?: Date;
    availabilityTimeFrom: any = '';
    availabilityTimeTo: any = '';
    interviewDurationMinutes: number=0;
    breakMinutes: number = 0;
    interviewSlotsPerDay: number = 0;
    jobTitle:any={};
    jobTitleCategory?: any = {};
    predefinedJobDescription:boolean=false;
    jobDescription:string='';
    positionRequirements:string='';
    attachmentFileName:string='';
    attachmentOriginalFileName: string = '';
    noOfPositions:any={};
    hiringUrgency:any={};
    performRemotely:any={};
    primaryLocation:any={};
    jobType:any={};
    jobSchedule:any[]=[];
    customJobSchedule: any[] = [];
    salaryMinimum:number=0;
    salaryMaximum: number = 0;
    payFrequency:any={};
    supplementPay: any[] = [];
    supplementalPayMoreInfo:string='';
    gracePeriod: any = {};
    benefits: any[] = [];
    screeningQuestions: ScreeningQuestion[]=[];
    showJobDescription:boolean=false;
    showPosition:boolean=false;
    showAttachment:boolean=false;
    showSchedule: boolean = false;
    showCustomSchedule: boolean = false;
    editJob:boolean=false;
    jpmStatus:any={};
}
export class JobTitle {
    title: string ='';
    jobDescription: string ='';
    jobTitleId: number=0;
    oneWayInterviewTemplateId: number=0;
}

export class PostJob{
    requisitionId:number=0;
    budget:number=0;
    fromDate:string='';
    toDate:string='';
    postDates: string[] = [];
}