import { LazyLoadEvent } from "primeng/api";
import { ComboBox } from "../common/common";

export interface ICommunicationTemplate {
    communicationTemplateID?:number;
    title?:number;
    description?:string;
    communicationTemplateTypeLIID?:number;
    channelLIID?:number;
    recordStatusLIID?:number;
    orderNo?:number;
    createdOn?:number;
    createdBy?:number;
    lastModifiedOn?:number;
    lastModifiedBy?:number;
    communicationTemplateTypeName?:number;
    communicationChannelName?:number;
    communicationRecordStatusName?:number;
}
export interface CommunicationFilters extends LazyLoadEvent {
    searchKeyword?: string;
    filter1?: number;
}
export class CommunicationPageData {
    templateTypes: ComboBox[] = [];
    templateChannels: ComboBox[] = [];
}
