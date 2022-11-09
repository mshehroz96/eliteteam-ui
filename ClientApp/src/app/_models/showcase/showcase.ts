export class ShowCaseDto {
    showcaseId?: number;
    title?: string;
    remarks?: string;
    showcaseExpiryDate?: Date = new Date();
    isDefaultShowcase?:boolean = false;
    guid : string = "";
    recordStatusLiid? : number;
    orderNo?: number;
    createdOn?: Date = new Date();
    lastModifiedOn?: Date = new Date();
    createdBy?: number;
    clients: ShowCaseClientDto[] = [];
    candidates : ShowCaseCandidateDto[] = [];
    isSelectClient?:boolean = true;
    isAnonymousShowCase?:boolean = false;
}

export class ShowCaseClientDto {
    email?: string;
    showCaseUUID?: string
}
export class ShowCaseCandidateDto {
    candidateUserId?: number;
    fullName?: string;
    showcaseCandidateID?: number;
}

export class ClientUserDto {
    clientUserId?: number;
    email?: string;
    showCaseUUID?: string;
}

export class AddJobCandidateDto  {
    requisitionID?: number;
    createdBy?: number;
    createdOn?: Date = new Date();
    lastModifiedOn?: Date = new Date();
    candidates : ShowCaseCandidateDto[] = [];
}

export class ShareCandidateToClientDto  {
    message?:string;
    candidates : ShowCaseCandidateDto[] = [];
    clients : ClientUserDto[] = [];
}

export class ExternalShowCaseInputDto  {
  uUID?:string;
}

export class UserProfileInput  {
  userId?:number;
}


