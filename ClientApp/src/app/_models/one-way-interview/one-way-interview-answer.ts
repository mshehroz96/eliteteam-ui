
export class OneWayInterViewAnswerList {
    oneWayInterviewAnswerId: number=0;
    oneWayInterviewQuestionId: number=0;
    requisitionCandidateId: number=0;
    questionText:string='';
    candidateCvid: number =0;
    answerVideoFileName: string='';
    timeTaken?: string | null;
    retakesTaken?: number | null;
    thinkTimeTaken?: string | null;
    recordStatusLiid?: number;
    orderNo?: number;
    createdOn?: string;
    userRating:number=0;
    answerRatings?: OneWayInterViewAnswerRatingList[] | null;
    answerComments?: OneWayInterViewAnswerCommentList[] | null;
    source:string='';
}

export class OneWayInterViewAnswerRatingList {
    oneWayInterviewAnswerId?: number;
    oneWayInterviewAnswerRatingId?: number;
    rating?: number | null;
    ratedBy?: string;
    createdBy?: number;
    ratedOn?: string | null;
}

export class OneWayInterViewAnswerRating {
    oneWayInterviewAnswerId?: number;
    oneWayInterviewAnswerRatingId?: number;
    rating?: number | null;
}

export class OneWayInterViewAnswerCommentList {
    oneWayInterviewAnswerId?: number;
    oneWayInterviewAnswerCommentId?: number;
    commentText?: string;
    commentedBy?: string;
    createBy?: number;
    commentedOn?: string | null;
}

export class OneWayInterViewAnswerComment {
    oneWayInterviewAnswerId?: number;
    oneWayInterviewAnswerCommentId?: number;
    commentText?: string | null;
    commentedBy?: number;
    commentedOn?: string | null;
}

export class OneWayInterViewAnswerDto {
  oneWayInterviewAnswerId? : number = 0;
  requisitionOneWayInterviewQuestionId? : number = 0;
  requisitionCandidateId? : number = 0;
  candidateCvid? : number = 0;
  answerVideoFileName? : string;
  timeTaken? : string;
  retakesTaken? : number = 0;
  thinkTimeTaken?: string;
  recordStatusLiid? : number = 0;
  orderNo : number = 0;
  createdOn?: string;
}

export class OneWayInterviewUpdateStatusInput {
  requisitionUUID: string = "";
  candidateUserId: number =0;
  cancelationReason? : string = ""
  requisitionCandidateStatusLIID : number = 0;
  requisitionInterviewRequestID: number = 0;
  requisitionCandidateId: number = 0;
  eventId: number = 0;
}
