import { LazyLoadEvent } from "primeng/api/lazyloadevent";

export interface RequisitionJPMActiveFilter extends LazyLoadEvent {
  listType?: string;
  filter1?: number;
  filter2?: number;
  filter3?: number;
  searchKeyword?: string;
}

