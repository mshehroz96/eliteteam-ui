
export interface RecruitersAssignment {
    companyId: number;
    primaryRecruiterId: number;
    secondaryRecruiterId: number;
    requisitionsRecruiters: RequisitionRecruiter[];
}

export interface RequisitionRecruiter{
    requisitionId: number;
    recruiterIds: number[];
}