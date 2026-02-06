export interface IJobDetails {
    amountSpent: number;
    applicantCount: number;
    campaignType: string;
    candidatesPresentedToClient: number;
    candidatesPurchasedByClient: number;
    companyName: string;
    createdBy: number;
    createdOn: string;
    interviewTypeSlotCount: number;
    jobTitle: string;
    jobsSubmittedByClient: number;
    jpmStatus: string | null;
    lastModifiedBy: string | null;
    lastModifiedOn: string | null;
    logoFileName: string;
    planName: string;
    postedOn: string;
    primaryRecruiter: string | null;
    recruiters: any | null;
    requisitionId: number;
    requisitionRecruiters: string; // JSON string containing recruiter information
    secondaryRecruiter: string | null;
    submittedHoursAgo: number;
    submittedOn: string;
    timeFromPostToLive: number;
    totalRecords: number;
    uuid: string;
}