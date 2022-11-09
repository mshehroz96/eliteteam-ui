
import { IRecruiterScheduleDay } from '../recutiter/IRecruiterSchedule';

export class Event {
    eventId: Number= 0;
    eventTypeId:Number= 0;
    calendarUserId: Number =0;
    requisitionId? : number;
    title: String= '';
    createdBy?: number = 1;
    slotDuration?: number = 0;
    eventParticipants : any[] = [];
    requisitionCandidateID: number = 0;
    venue? : string = "";
    passCode: string = '';
    meetingNumber: string = '';
    fromDateTimeOffSet!: Date;
    toDateTimeOffSet!: Date;
    timeZone:string= '';
    requisitionInterviewRequestID : number = 0;
    selectedDays?:IRecruiterScheduleDay[] = [];
    utcOffSet: number = 0;
    recruiterId : number = 0;
}

export class CheckUserAvailablity{
  date!: Date;
  time ?: any ;
  toTime? :any;
  userId : number = 1;
}

export class SearchEventInput{
  clientRequisitions: any[] = [];
  userId?: number = 1;
  withSchedules?:boolean;
  StartDate!: Date;
  EndDate!: Date;
}

export interface Duration {
  name: string,
  id: number
}
