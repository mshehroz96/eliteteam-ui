import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus',
})
export class UserStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null ) {
      return 'Not Found';
    } else if (value == 3) {
      return 'Blocked';
    } else if (value == 1) {
      return 'Active';
    } else if (value == 2) {
      return 'Inactive';
    } else if (value == 4) {
      return 'Pending';
    } else {
      return 'Not Found';
    }
  }
}
