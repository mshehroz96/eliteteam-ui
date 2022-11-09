import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFocusInvalid]'
})
export class FocusInvalidDirective {
  @Input() appFocusInvalid!: FormGroup;
  constructor(private el: ElementRef) { }

  @HostListener('submit')
  onFormSubmit() {
    for (const key of Object.keys(this.appFocusInvalid.controls)) {
      if (!key.toString().toLowerCase().includes('file')) {
        if (this.appFocusInvalid.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          if (invalidControl != null) {
            invalidControl.focus();
            this.appFocusInvalid.controls[key].markAsTouched();
            break;
          }
        }
      }
    }

    for (const key of Object.keys(this.appFocusInvalid.controls)) {
      if (key.toString().toLowerCase().includes('file')) {
        if (this.appFocusInvalid.controls[key].invalid) {
          const invalidControl = this.appFocusInvalid.controls[key];
          if (invalidControl != null) {
            this.appFocusInvalid.controls[key].markAsTouched();
            break;
          }
        }
      }
    }

  }

}
