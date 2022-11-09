export interface IRecruitersAssignment {

    companyId?: number;
    primaryRecruiterId?:number;
    secondaryRecruiterId?:number;
    requisitions: ClientRequisition[];

}
export interface ClientRequisition{
    title?:string;
    jobCategoryName?:string;
    campaignType?:string;
    requisitionId?:number;
    selected?:boolean;
    createdOn?:Date;
    recruiters?:RequisitionRecruiter[];
    profilesRequired?:string;
    submittedOn?:string;
}
export interface RequisitionRecruiter{
    recruiter?:string;
    recruiterId?:number;
}
