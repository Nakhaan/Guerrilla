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

    // onClick(event: Event): void {
    //     if (window.innerWidth < 600 && !(event.target instanceof HTMLButtonElement)) {
    //     // Faites ce que vous voulez faire ici
    //         alert('La div a été cliquée!');
    //     }
    // }


}
