import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthentificationService } from './authentification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public constructor(private authService: AuthentificationService) { }

    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.authService.getToken();
        if (authToken) {
            const authRequest = req.clone({
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
            return next.handle(authRequest);
        }
        return next.handle(req);
    }
}
