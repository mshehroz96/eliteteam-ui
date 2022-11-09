import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            
            return true;
        }
        else
        {
            this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}