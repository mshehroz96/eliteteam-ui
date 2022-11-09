import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface RecuriterFilter extends LazyLoadEvent {
    sqlCondition?: string;
    sortCondition?: string;
    showCaseId? : number;
    ShowCaseUUID?: string;
}

export interface RecruiterExperties {
   recruiterSpecializationID ? : number;
    recruiterUserID? : number;
    areaOfExpertiseLIID ? : number;
    recordStatusLIID? : number;
   title?: string;
}
