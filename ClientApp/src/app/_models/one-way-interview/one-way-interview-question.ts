import { OneWayInterviewTemplate } from "./one-way-interview-template";

export class OneWayInterviewQuestion {
    oneWayInterviewQuestionId: number=0;
    oneWayInterviewTemplateId?: number;
    questionText?: string;
    orderNo?: number;
    timeAllowed?: string;
    retakesAllowed?: number;
    thinkTimeAllowed?: string;
    status?: string;
    interviewTemplates:OneWayInterviewTemplate[]=[];
    applyAll:boolean=false;
}
export class OneWayInterviewQuestionList {
    oneWayInterviewQuestionId: number=0;
    oneWayInterviewTemplateId: number =0;
    questionText?: string;
    orderNo?: number;
    timeAllowed?: string;
    retakesAllowed: number = 0;
    thinkTimeAllowed?: string;
    status?: string;
}

export class OneWayInterviewQuestionRequest
{
    requisitionCandidateId:number=0;
    requisitionUuid:string='';
    candidateUserId : number = 0;
}

