import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  pure:true,
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  
  transform(value: string): unknown {
    
    if (value == null || value == '') {
      return '';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    
  }

}
