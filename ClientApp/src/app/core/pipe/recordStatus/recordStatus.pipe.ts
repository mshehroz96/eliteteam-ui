import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordStatus'
})
export class RecordStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    switch (value) {
      case null:
      return 'Not Found';
      case 1:
      return 'Active';
      case 2:
      return 'InActive';
      case 3:
      return 'Archived';
      case 4:
      return 'Deleted';
      case 107:
      return 'Blocked';
      case 108:
      return 'Pending';
      case 281:
      return 'Draft';
      case 282:
      return 'Closed';
      case 287:
      return 'Cancelled';
      default:
        return 'Not Found'
    }
  }

}
