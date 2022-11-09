import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { MessageService } from 'primeng/api';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private authenticationService: AuthenticationService, 
    private messageService: MessageService,
    private zone: NgZone) {}

  handleError(error: any): void {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    
    if (error && [401, 403].indexOf(error.status) !== -1) {
      this.authenticationService.logout();
    }

    if (error)
    { 
      if (error.error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
      
    }
  }
}
