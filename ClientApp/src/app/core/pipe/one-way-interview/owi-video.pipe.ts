import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'owiVideo'
})
export class OwiVideoPipe implements PipeTransform {

  transform(value: string): string  {
    
    if(value)
    {
      if (!value.includes(FILES_PATHS.BASE_PATH)) {
        return FILES_PATHS.MAP_ONEWAY_INTERVIEWS(value);
      }
      else {
        return value;
      }
    }
    return value;
  }

}
