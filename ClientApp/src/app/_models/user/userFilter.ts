import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface UserFilter extends LazyLoadEvent {
    userType?: number;
    userStatus?:number;
}