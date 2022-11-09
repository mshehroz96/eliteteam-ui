export interface IRecruiterSchedule {
    recruiterScheduleID?:number;
    recruiterUserID?:number;
    scheduleFromDate?:string;
    scheduleToDate?:string;
    recordStatusLIID?:number;
    orderNo?:number;
    createdOn?:string;
    createdBy?:number;
    lastModifiedOn?:string;
    lastModifiedBy?:number;
    recruiterUserName?:string;
    recordStatusName?:string;
    recruiterScheduleDays?:IRecruiterScheduleDay[];
}

export interface IRecruiterScheduleDay {
    recruiterScheduleDayID?:number;
    recruiterScheduleID?:number;
    dayNo?:number;
    dayTimingFrom?:string;
    dayTimingTo?:string;
    recordStatusLIID?:number;
    orderNo?:number;
    createdOn?:string;
    createdBy?:number;
    lastModifiedOn?:string;
    lastModifiedBy?:number;
    recordStatusName?:string;
    dayName?:string;
    required:boolean;
    includeWeekdays?:boolean;
    selected?:boolean;
}