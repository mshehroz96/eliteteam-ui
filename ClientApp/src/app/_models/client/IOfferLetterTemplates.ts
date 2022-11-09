import { LazyLoadEvent } from "primeng/api";

export interface IOfferLetterTemplates {
    clientOfferLetterTemplateID?:number;
    title?:string;
    body?:string;
    recordStatusLIID?:number;
    orderNo?:number;
    createdOn?:string;
    createdBy?:number;
    lastModifiedOn?:string;
    lastModifiedBy?:number;
    recordStatusName?:string;
    createdByName?:string;
    lastModifiedByName?:string;   
}
export interface  IOfferLetterFilters extends LazyLoadEvent {
    searchKeyword?: string;
}
