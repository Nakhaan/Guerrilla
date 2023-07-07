import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, takeUntil } from 'rxjs';

import { Destroy } from 'src/app/commons/destroy';

import { AuthentificationService } from '../authentification.service';

interface LoginForm {
    username: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends Destroy {

    protected loginFormGroup: FormGroup<LoginForm>;
    protected hidePassword = true;
    protected loading$ = new BehaviorSubject(false);

    public constructor(
        private authenticationService: AuthentificationService,
        private router: Router
    ) {
        super();

        this.loginFormGroup = new FormGroup({
            username: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
            password: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
        });
    }

    protected login(): void {
        if (!this.loginFormGroup.value.username || !this.loginFormGroup.value.password) {
            throw new Error('Username and password should be defined here');
        }

        this.loading$.next(true);
        this.authenticationService.login$(this.loginFormGroup.value.username, this.loginFormGroup.value.password).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                // if (error.status === 401) {
                //     this.messageService.logError('Wrong login/password');
                // } else {
                //     this.messageService.logError(`BAD ${this.loginFormGroup.value.username || ''}${error.message}`);
                // }
                this.loading$.next(false);
                return EMPTY;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.loading$.next(false);
            void this.router.navigate([''], { queryParamsHandling: 'preserve' });
        });
    }

    protected register(): void {
        if (!this.loginFormGroup.value.username || !this.loginFormGroup.value.password) {
            throw new Error('Username and password should be defined here');
        }

        this.loading$.next(true);
        this.authenticationService.register$(this.loginFormGroup.value.username, this.loginFormGroup.value.password).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                // if (error.status === 401) {
                //     this.messageService.logError('Wrong login/password');
                // } else {
                //     this.messageService.logError(`BAD ${this.loginFormGroup.value.username || ''}${error.message}`);
                // }
                this.loading$.next(false);
                return EMPTY;
            }),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.loading$.next(false);
            void this.router.navigate([''], { queryParamsHandling: 'preserve' });
        });
    }

}
