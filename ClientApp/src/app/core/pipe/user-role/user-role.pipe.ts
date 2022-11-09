import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null || value == 0) {
      return 'Not Found';
    }
    else if (value == 1) {
      return 'Administrator';
    }
    else if (value == 2) {
      return 'Recruiter Manager';
    }
    else if (value == 3) {
      return 'Recruiter';
    }
    else if (value == 4) {
      return 'Job Post Manager';
    }
    else if (value == 5) {
      return 'Client Admin';
    }
    else if (value == 6) {
      return 'Client User';
    }
    else if (value == 7) {
      return 'Candidate';
    }
    else if (value == 8) {
      return 'External Interviewer';
    }
    else if (value == 9) {
      return 'Prospect Client';
    }
    else if (value == 10) {
      return 'Public Visitor';
    }
    else {
      return 'Not Found';
    }
  }
}
