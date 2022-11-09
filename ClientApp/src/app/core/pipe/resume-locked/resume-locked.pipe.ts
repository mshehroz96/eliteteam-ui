import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'resumeLocked'
})
export class ResumeLockedPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return '';
    } else {

      if(!value.includes(FILES_PATHS.BASE_PATH))
      {
        return FILES_PATHS.MAP_USER_RESUME_LOCKED(value);
      }
      else
      {
        return value;
      }
    }
  }

}
