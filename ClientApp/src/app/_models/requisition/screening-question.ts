
export class ScreeningQuestion {
    requisitionScreeningQuestionId:number = 0;
    screeningQuestionId: number = 0;
    screeningQuestionCategoryId: number=0;
    title: string = '';
    jpmApprovalStatus: string = '';
    selected:boolean =false;
    options: ScreeningQuestionOption[] = [];
    questionCategories:any[]=[];
    oneWayInterviewTemplateId:number=0;
    addToTemplate:boolean=false;
    additionType: string = '';
}

export class ScreeningQuestionCategory {
    screeningQuestionCategoryId: number=0;
    title: string = '';
}

export class ScreeningQuestionOption {
    screeningQuestionOptionId: number = 0;
    screeningQuestionId: number = 0;
    title: string = '';
    autoEvaluationResult: string = '';
}

export class RequisitionScreeningQuestionsStatus {
    requisitionId: number = 0;
    ids: number[] = [];
    jpmApprovalStatus: string = '';
}