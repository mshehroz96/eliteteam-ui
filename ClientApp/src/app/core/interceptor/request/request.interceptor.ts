import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable,finalize, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
        private zone: NgZone) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.accessToken;
        const isApiUrl = request.url.startsWith(environment.webApiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`,
                    "Access-Control-Allow-Origin":"*"
                }
            });
        }

        return next.handle(request).pipe(
            finalize(() => {
            })
        ) as Observable<HttpEvent<any>>;;
    }
}
