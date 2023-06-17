import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

import { Shot } from './model/shot.model';
import { ShotDialogComponent } from './shot-dialog/shot-dialog.component';
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
        MatRippleModule,
        MatDialogModule
    ],
    templateUrl: './shotlist.component.html',
    styleUrls: ['./shotlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShotlistComponent {

    protected shotList$: Observable<Shot[]>;

    protected keywords = ['Scène', 'Plan', 'Valeur de plan', 'Angle', 'Mouvement', 'Objectif', 'Ouverture', 'Acteurs', 'Description', 'Temps Estim.'];

    public constructor(private dialog: MatDialog,
        shotlistService: ShotlistService) {

        this.shotList$ = shotlistService.getShots$();
    }

    protected openDialog(): void {
        this.dialog.open(ShotDialogComponent, {
            data: null
        });
    }

    protected openInfo(shot: Shot): void {
        this.dialog.open(ShotDialogComponent, {
            data: shot
        });
    }
}
