import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';

interface Token {
    token: string;
}

interface UserInfo {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    token: string;

}

// interface TokenPayload {
//     authorizations: string[];
//     login: string;
// }

// interface UserInfo {
//     username: string;
//     role: string;
// }

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private authEndPoint = 'http://192.168.138.33:4200/api/auth';

    public constructor(
        private http: HttpClient,
        private router: Router
    ) {
    }

    public login$(username: string, password: string): Observable<Token> {
        const data = {
            'login': username,
            'password': password
        };

        return this.http.post<Token>(`${this.authEndPoint}/login`, data).pipe(
            map(token => {
            // login successful
                if (token) {
                    this.setUserSession(JSON.stringify(token));
                }
                return token;
            })
        );
    }

    public register$(username: string, password: string): Observable<Token> {
        const data = {
            'login': username,
            'password': password
        };

        return this.http.post<Token>(`${this.authEndPoint}/register`, data).pipe(
            map(token => {
            // login successful
                if (token) {
                    this.setUserSession(JSON.stringify(token));
                }

                return token;
            })
        );
    }

    public logout$(): Observable<unknown> {
        const currentJwtAsString = localStorage.getItem('currentUser');
        const currentJwt = currentJwtAsString && JSON.parse(currentJwtAsString) as unknown;
        if (currentJwt) {
            return this.http.post<unknown>(`${this.authEndPoint}/logout`, currentJwt).pipe(
                catchError(() => of(undefined)),
                tap(() => {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('token');
                    void this.router.navigate(['login']);
                })
            );
        } else {
            return EMPTY;
        }

    }

    // public getLogin(): string | undefined {
    //     const userInfoAsString = localStorage.getItem('userInfo');
    //     const userInfo = userInfoAsString ? JSON.parse(userInfoAsString) as UserInfo : undefined;
    //     return userInfo?.username;
    // }

    public getToken(): string | null {
        const userInfoAsString = localStorage.getItem('currentUser');
        const token = userInfoAsString ? JSON.parse(userInfoAsString) as UserInfo : undefined;
        if (token?.token) {
            return token.token;
        }
        return null;
    }

    // check if user is authenticated and authorized to perform action
    // public isAuthorized(): boolean {
    //     const userInfoAsString = localStorage.getItem('userInfo');
    //     const userInfo = userInfoAsString ? JSON.parse(userInfoAsString) as UserInfo : undefined;
    //     if (!userInfo) {
    //         return false;
    //     }
    //     if (!authorizedRoles.includes(userInfo.role)) {
    //         return false;
    //     }

    //     return true;
    // }

    private setUserSession(token: string): void {
        // store jwt token in local storage to keep user logged in between page refreshes
        const userInfo = token ? JSON.parse(token) as UserInfo : undefined;
        if (userInfo?.token) {
            localStorage.setItem('token', userInfo.token);
        }
        localStorage.setItem('currentUser', token);
        // decode the token to get its payload
        // const decodedPayload = jwtDecode<{ tokenPayload: string }>(token);
        // const tokenPayload = JSON.parse(decodedPayload.tokenPayload) as TokenPayload;
        // const role = tokenPayload.authorizations[0];
        // const username = tokenPayload.login;
        // // store username and role of user
        // const userInfo = {
        //     username,
        //     role
        // };
        // console.log(`***userInfo username = ${userInfo.username}`);
        // console.log(`***userInfo role = ${userInfo.role}`);

        // localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}
