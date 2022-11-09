export class jobTitleDetailsResponse {
  categoryId: number=0;
  jobTitleId: number=0; //not sent from API
  jobTitle: string="";
  jobDescription: string="";
  jobOneWayInterviewTemplateID: number=0;
  screeningQuestionsCategories:any[]=[];
  associatedJobs:any[]=[];
  oneWayInterviewTemplate:any[]=[];
  createdOn!:Date;
  createdBy: number=0;
  lastModifiedOn!:Date;
  lastModifiedBy: number=0;
}


