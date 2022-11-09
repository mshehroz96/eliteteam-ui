export class RegisterpageData {
    titles: ComboBox[] = [];
    industries: ComboBox[] = [];
    noOfEmployees: ComboBox[] = [];
}

export interface ComboBox {
    value?:number;
    displayText?:string;
    stringValue?:string;
    isSelected?:boolean;
};

export interface Filter {
    id : number;
    filterField:string;
    filterOptions: FilterOptionDto[];
    filterOption:string;
};
export class FilterOptionDto {
     conditionTarget? : string;

    filterField? : string;

     operatorDisplay?: string;

     operatorCondition?: string;

     uiContorl? : string;

     uiContorlDataSource?: string;

     listId ?:  number;
}

export interface ActivityDto {
  activityTypeLiid?:number;
  userId?:number;
  companyId?:number;
  title?:string;
  description?:string;
  requistionUUID?:string;
};
