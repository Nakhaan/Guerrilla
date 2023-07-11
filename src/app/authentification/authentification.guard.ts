import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthentificationService } from './authentification.service';


export const authenticationGuard = () => (route: ActivatedRouteSnapshot): boolean => {
    const router = inject(Router);
    const authenticationService = inject(AuthentificationService);
    // const messageService = inject(MessageService);

    // this will be passed from the route config on the data property
    /** check if user is authenticated and authorized */
    // if (authorizedRoles && authenticationService.isAuthorized(authorizedRoles)) {
    //     // logged in so return true
    //     return true;
    // }

    // not logged in so redirect to login page with the return url
    if (authenticationService.getToken()) {
        return true;// messageService.logError('User is not allowed to access page');
    }
    void router.navigate(['login'], { queryParams: route.queryParams });
    return false;
};
