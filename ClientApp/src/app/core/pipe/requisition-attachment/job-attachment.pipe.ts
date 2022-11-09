import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'jobAttachment'
})
export class JobAttachmentPipe implements PipeTransform {

  transform(value?: string): string | undefined {
    if (value) {
      if (!value.includes(FILES_PATHS.BASE_PATH)) {
        return FILES_PATHS.MAP_REQUISITION_ATTACHMENTS(value);
      }
    }

    return value;
  }
}
