import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime',
})
export class ElapsedTimePipe implements PipeTransform {
  transform(value: number, ...args: number[]): unknown {
    if (value == null ) {
      return "Not Found";
    } else if (value < 24) {
      return "<span class='badge bg-label-success'><i class='fa fa-clock'></i> " + value.toString() + " Hours</span>";
    } else if (value >= 24 && value <= 120) {
      var intDays = Math.floor(value/24);
      return "<span class='badge bg-label-warning'><i class='fa fa-clock'></i> " + intDays.toString() + " Days</span>";
    } else if (value >= 120) {
      var intDays = Math.floor(value/24);
      return "<span class='badge bg-label-danger'><i class='fa fa-clock'></i> " + intDays.toString() + " Days</span>";
    } else {
      return "Not Handled:" + value;
    }
  }
}
