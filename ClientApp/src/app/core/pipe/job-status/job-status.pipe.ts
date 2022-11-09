import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobStatus',
})
export class JobStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null ) {
      return "Not Found";
    } else if (value == "Posted") {
      return "<span class='badge bg-success'>" + value + "</span>";
    } else if (value == "Under Review" || value == "Pending Approval"|| value == "In Progress") {
      return "<span class='badge bg-warning'>" + value + "</span>";
    } else {
      return "Not Handled:" + value;
    }
  }
}
