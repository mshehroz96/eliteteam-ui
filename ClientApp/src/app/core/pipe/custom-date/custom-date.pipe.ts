import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string): string {
    if(value)
    {
      if (moment(value).isValid()) {

        const timezone = moment.tz.guess();
        const sourceFormat = 'MM/DD/YYYY HH:mm';
        const format = 'MM/DD/YYYY';

        value = moment(value).format(sourceFormat);

        return moment.tz(value + ' +00:00', timezone).format(format);

      }
    }
    return value;
  }
}
