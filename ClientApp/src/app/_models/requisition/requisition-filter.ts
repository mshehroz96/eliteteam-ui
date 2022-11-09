import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface RequisitionFilter extends LazyLoadEvent {
    jobStatus?: string;
    campaignType?:number
}