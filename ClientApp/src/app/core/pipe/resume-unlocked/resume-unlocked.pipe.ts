import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'resumeUnLocked'
})
export class ResumeUnLockedPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return '';
    } else {

      if(!value.includes(FILES_PATHS.BASE_PATH))
      {
        return FILES_PATHS.MAP_USER_RESUME_UNLOCKED(value);
      }
      else
      {
        return value;
      }
    }
  }

}
