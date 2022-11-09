import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface candidatefilter extends LazyLoadEvent {
    candidateUserId? : number;
    requisitionUUID? : string;
}


export interface userAvailablityFilter  {
  userId? : number;
  month? : number;
  year? : number;
}

export interface userSlotFilter  {
  checkDate? : Date ;
  inviterUserID? : number;
  requisitionInterviewRequestID?:number;
}

export interface candidateBasicInfofilter extends LazyLoadEvent {
  candidateUserId? : number;
  candidateCVId? : number;
}
