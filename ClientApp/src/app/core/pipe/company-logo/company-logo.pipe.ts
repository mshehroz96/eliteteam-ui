import { Pipe, PipeTransform } from '@angular/core';
import { FILES_PATHS } from 'src/app';

@Pipe({
  name: 'companyLogo'
})
export class CompanyLogoPipe implements PipeTransform {

  transform(value?: string): string {
    if (!value) {
      return FILES_PATHS.MAP_COMPANY_LOGO('company_logo_default.png');
    } else {

      if (!value.includes(FILES_PATHS.BASE_PATH)) {
        return FILES_PATHS.MAP_COMPANY_LOGO(value);
      }
      else {
        return value;
      }
    }
  }

}
