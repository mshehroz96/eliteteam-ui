// export interface ICandidateCVProfile {
//     candidateCVID?: number;
//     candidateUserID?: number;
//     fullName?: string;
//     birthDate?: string;
//     gender?: string;
//     workExperience?: ICandidateCVWorkExperience[];
//     educations?: ICandidateCVEducation[];
//     awards?: ICandidateCVAward[];
//     publications?: ICandidateCVPublication[];
//     languages: any[];
// }
// export interface  ICandidateCVWorkExperience {
//     candidateCV_WorkExperienceID?: number;
//     candidateCVID?:number;
//     jobTitle?: string;
//     company?: string;
//     location?: string;
//     fromDate?: string;
//     toDate?: string;
//     description?:string;
// }

// export interface  ICandidateCVEducation {
//     candidateCV_EducationID?: number;
//     candidateCVID?:number;
//     degree?: string;
//     school?: string;
//     location?: string;
//     fromDate?: string;
//     toDate?: string;
// }

// export interface  ICandidateCVAward {
//     candidateCV_AwardID: number;
//     candidateCVID:number;
//     title: string;
//     dateAwarded: string;
// }

// export interface  ICandidateCVPublication {
//     candidateCV_PublicationID: number;
//     candidateCVID:number;
//     title: string;
//     uRL: string;
//     datePublished: string;
// }
export interface ICandidateCVProfile {
    candidateCVID?: number | null;
    candidateUserID?: number | null;
    fullName?: string | null;
    birthDate?: string | null;
    gender?: string | null;
    workExperience?: (ICandidateCVWorkExperience | null)[];
    educations?: (ICandidateCVEducation | null)[];
    skills?:ICandidateCVProfileSkills[];
    languages?: (ICandidateCVProfileLanguages | null)[];
    certifications?: (ICandidateCVProfileCertifications | null)[];
    awards?: (ICandidateCVProfileAward | null)[];
    publications?: (ICandidateCVProfilePublication | null)[];
    cvReferences?: (ICandidateCVProfileReferences | null)[];
}

export interface ICandidateCVWorkExperience {
    candidateCV_WorkExperienceID?: number | null;
    candidateCVID?: number | null;
    jobTitle?: string | null;
    company?: string | null;
    location?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    description?: string | null;
}

export interface ICandidateCVEducation {
    candidateCV_EducationID?: number | null;
    candidateCVID?: number | null;
    degree?: string | null;
    school?: string | null;
    location?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
}

export interface ICandidateCVProfileSkills {
    candidateCV_SkillID?: number | null;
    candidateCVID?: number | null;
    title?: number | null;
    listItemID?: number | null;
}

export interface ICandidateCVProfileLanguages {
    candidateCV_LanguageID?: number | null;
    candidateCVID?: number | null;
    title?: number | null;
    listItemID?: number | null;
}

export interface ICandidateCVProfileCertifications {
    candidateCV_CertificationID?: number | null;
    candidateCVID?: number | null;
    title?: string | null;
    company?: string | null;
    validityFromDate?: string | null;
    validityToDate?: string | null;
    description?:string | null;
}

export interface ICandidateCVProfileAward {
    candidateCV_AwardID?: number | null;
    candidateCVID?: number | null;
    title?: string | null;
    dateAwarded?: string | null;
    description?:string | null;
}

export interface ICandidateCVProfilePublication {
    candidateCV_PublicationID?: number | null;
    candidateCVID?: number | null;
    title?: string | null;
    url?: string | null;
    datePublished?: string | null;
    description?:string | null;
}

export interface ICandidateCVProfileReferences {
    candidateCV_ReferenceID?: number | null;
    candidateCVID?: number | null;
    name?: string | null;
    jobTitle?: string | null;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
}