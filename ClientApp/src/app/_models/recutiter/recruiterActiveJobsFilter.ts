import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface RecruiterActiveJobsFilter extends LazyLoadEvent {
    filter1?: number;
    filter2?: number;
    filter3?: number;
    searchKeyword?: string;
    userId?:number;
    activeInactive?:number;
}
