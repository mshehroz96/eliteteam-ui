import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campaignType'
})
export class CampaignTypePipe implements PipeTransform {

  transform(value?: string): string {
    if (value) {
      switch (value) {
        case 'Video' :
          return 'bx bxs-video';
        case 'Resume' :
          return 'bx bxs-detail';
        case 'Interview' :
          return 'bx bxs-calender'
        default:
          return '';
      }
    }
    return '';
  }
}
