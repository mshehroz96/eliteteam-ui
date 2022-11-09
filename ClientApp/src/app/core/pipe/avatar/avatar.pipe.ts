import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return FILES_PATHS.MAP_USER_AVATARS('user_avatar_blank.png');
    } else {
      
      if(!value.includes(FILES_PATHS.BASE_PATH))
      {
        return FILES_PATHS.MAP_USER_AVATARS(value);
      }  
      else 
      {
        return value;
      }
    }
  }

}
