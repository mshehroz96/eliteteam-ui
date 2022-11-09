import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface RecruiterShowcasefilter extends LazyLoadEvent {
    showCaseUUID? : string;
    sqlCondition? : string;
    userId? : number;
}
