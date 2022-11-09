import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface ClientShowCaseFilter extends LazyLoadEvent {
    showCaseUUID? : string;
    sqlCondition? : string;
    userId? : number;
}
