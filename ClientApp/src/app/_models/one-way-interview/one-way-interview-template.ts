import { OneWayInterviewQuestion } from "./one-way-interview-question";

export class OneWayInterviewTemplate {
    oneWayInterviewTemplateId: number=0;
    title?: string;
    orderNo?: number;
    jobTitles:any[]=[];
    question?:OneWayInterviewQuestion[]
}