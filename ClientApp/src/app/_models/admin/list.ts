
export class List {
  listId: number = 0;
  keyCode: string = '';
  title: string = '';
  description: string = '';
  isSystemManaged:boolean =false;
  orderNo?:number;
  recordStatusLIID?:number;
}

export class ListItem {
  listItemId: number = 0;
  listId: number = 0;
  title: string = '';
  description: string = '';
  orderNo: number = 0;
  style: string = '';
  icon: string = '';
  isSystemManaged:boolean =false;

}

export class GetListsRequest {
  strRFU1: string = '';
}




