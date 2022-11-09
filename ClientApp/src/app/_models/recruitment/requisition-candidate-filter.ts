import { RequisitionRequest } from "../requisition/requisition-request";
import { RequisitionCandidate, RequisitionCandidateStatsRM } from "./requisition-candidate";

export class RequisitionCandidateFilter {
    requisitionUuid:string='';
    first: number =0;
    status: string ='All';
    filters: any[]=[];
    rows: number = 9;
}

export class ApplicantProfileDataFilter {
    applicantId: number=0;
    first: number = 0;
    rows: number = 100;
}

export class ApplicantDetails {
   userId:number=0;
   firstName?:string='';
   lastName?:string='';
   email?:string='';
   mobileNo?:string='';
   unlockedResumeFileName:string='';
}

export class ApplicantProfileData
{
   candidates!:RequisitionCandidate[];
   applicantDetails!: ApplicantDetails;
   requisitionDetails!: RequisitionRequest;
   applicantActivities?: any[];
}

export class RequisitionApplicantStatus {
    applicantId: number=0;
    status: string ='';
    remarks: string ='';
}
