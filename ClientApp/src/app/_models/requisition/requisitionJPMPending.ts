export class RequisitionJPMPending {
    requisitionId: number=0;
    jobTitle: string="";
    logoFileName: string="";
    companyName: string="";
    planName: string="";
    submittedOn!: Date;
    submittedHoursAgo: number=0;
    jPMStatus: string="";
    jobsSubmittedByClient: number=0;
    candidatesPresentedToClient: number=0;
    candidatesPurchasedByClient: number=0;
    campaignType: string="";
    interviewTypeSlotCount: number=0;
    primaryRecruiter: string="";
    secondaryRecruiter: string="";
    requisitionRecruiters: string="";
    recruiters: string="";
    recruitersHTML: string="";
}
