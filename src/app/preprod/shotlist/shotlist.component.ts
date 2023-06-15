import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { Shot } from './model/shot.model';
import { ShotlistService } from './shotlist.service';

interface Data {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
}

@Component({
    selector: 'app-shotlist',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule
    ],
    templateUrl: './shotlist.component.html',
    styleUrls: ['./shotlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShotlistComponent {

    protected shotList$: Observable<Shot[]>;

    protected keywords = ['Scène', 'Plan', 'Valeur de plan', 'Angle', 'Mouvement', 'Objectif', 'Ouverture', 'Acteurs', 'Description', 'Temps Estim.'];

    public constructor(private renderer: Renderer2, private el: ElementRef, shotlistService: ShotlistService) {

        this.shotList$ = shotlistService.getShots$();
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit(): void {
        this.renderer.listen(window, 'resize', () => {
            this.toggleClickableDiv(window.innerWidth);
        });

        this.toggleClickableDiv(window.innerWidth);
    }

    toggleClickableDiv(width: number): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const clickableDiv = this.el.nativeElement.querySelector('.clickable-div');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const alwaysClickableButton = this.el.nativeElement.querySelector('.always-clickable-button');

        if (width < 600) {
            this.renderer.setStyle(clickableDiv, 'pointer-events', 'auto');
        } else {
            this.renderer.setStyle(clickableDiv, 'pointer-events', 'none');
            this.renderer.setStyle(alwaysClickableButton, 'pointer-events', 'auto');
        }
    }

    onClick(event: Event): void {
        if (window.innerWidth < 600 && !(event.target instanceof HTMLButtonElement)) {
        // Faites ce que vous voulez faire ici
            alert('La div a été cliquée!');
        }
    }


}
