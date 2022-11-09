export class RequisitionCandidate {
    applicantId: number = 0;
    userId: number=0;
    firstName: string ='';
    lastName: string ='';
    jobTitle: string='';
    avatarFileName: string ='';
    status: string ='';
    statusLiid:number=0;
    age: string ='';
    recruiterRating: number=0;
    isUnlocked: boolean=false;
    experienceInYear: string ='';
    campaignType: string ='';
    appliedOn: string ='';
    totalRecords: number=0;
    qualified:boolean=false;
    source:string='';
    result: string = '';
    completedDate: string = '';
    scheduledDate: string = '';
    resumeFileName: string = '';
    rejectionRemarks: string = '';
    isCandidate: boolean = false;
    profileUrl:string='';
    unlockTimeLeft:number=0;
}
export class RequisitionCandidateStatsRM {
    requisitionId?: number;
    all_Applicants?: number;
    new_Applicants?: number;
    pending_Applicants?: number;
    new_Candidates?: number;
    pending_Candidates?: number;
    active_Candidates?:number;
    hired_Candidates?: number;
    disqualified_Candidates?:number;
}

export class RequisitionCandidateStatsClient {
    requisitionId?: number;
    all_Candidates?: number;
    new_Candidates?: number;
    interview_Candidates?: number;
    offer_Candidates?: number;
    hired_Candidates?: number;
    rejected_Candidates?: number;
}

export class RequisitionRMStats {
    uuid?: string;
    requisitionId?: number;
    campaignType?: string;
    jobTitle?: string;
    applicants?: number;
}

export class RequisitionClientStats {
    uuid?: string;
    requisitionId?: number;
    campaignType?: string;
    jobTitle?: string;
    applicants?: number;
}

export class ApplicantScheduleInterview {
    requisitionInterviewRequestId: number=0;
    requisitionCandidateId: number=0;
    requesterSlot1?: string;
    requesterSlot2?: string;
    requesterSlot3?: string;
    expiryDateTime?: string;
    oWDeadlineType?: string;
    oWDeadlineAbsoluteDateTime?: string;
    oWDeadlineRelativeDateTime?: string;
    oWDeadlineRelativeDateTimeDaysLiid?: number;
    isZoomMeeting:boolean=false;
    zoomScheduleType:string=''
    schedulingOption: string = '';
    clientInterviewVenue:string='';
    interviewers:any[]=[];
    inviteMessage:string='';
}



export class InterviewRating {
    interviewRatingCompetencyLiid: number = 0;
    rating: number = 0;
    title:string='';
}




export class InterviewFeedBack {
    requisitionInterviewRequestId: number = 0;
    competencyRating: InterviewRating[]=[];
    comment: InterviewRating[] = [];
}

export class OfferDetail {
    offerId: number=0;
    requisitionCandidateId: number = 0;
    clientOfferLetterTemplateId: number = 0;
    workMode: string ='';
    offerExpiryDate: string ='';
    netSalary: number=0;
    offerSent: string='';
}

export class RedactDetail {
    personalDetails:any[]=[];
    workExperiences: any[] = [];
    educations: any[] = [];
    awards: any[] = [];
    publications: any[] = [];
    certifications: any[] = [];
    links: any[] = [];
}
export class ApplicantResumeDetail {
    requisitionCandidateId: number =0;
    candidateUserId: number=0;
    fullName: string ='';
    email: string ='';
    mobile: string ='';
    workExperiences: ApplicantWorkExperience[] =[];
    educations: ApplicantEduction[] =[];
    links: ApplicantLink[] =[];
    certifications: ApplicantCertificate[] =[];
    publications: ApplicantPublication[] =[];
    awards: ApplicantAward[] =[];
}

export class ApplicantLink{
    id: number=0;
    url: string ='';
}

export class ApplicantCertificate{
    id: number=0;
    title: string ='';
    description: string ='';
    company: string ='';
    field: string ='';
    fromDate: string ='';
    toDate: string ='';
}

export class ApplicantPublication{
    id: number=0;
    title: string ='';
    description: string ='';
    uRL: string ='';
    datePublished: string ='';
}

export class ApplicantAward{
    id: number=0;
    title: string ='';
    description: string ='';
    dateAwarded: string ='';
}

export class ApplicantWorkExperience{
    id: number=0;
    title: string='';
    description: string ='';
    company: string ='';
    location: string ='';
    fromDate: string ='';
    toDate: string ='';
}

export class ApplicantEduction{
    id: number=0;
    degree: string ='';
    school: string ='';
    field: string ='';
    location: string ='';
    fromDate: string ='';
    toDate: string ='';
}