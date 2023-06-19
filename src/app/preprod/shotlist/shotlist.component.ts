import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { takeUntil } from 'rxjs';

import { Destroy } from 'src/app/commons/destroy';

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
        MatDialogModule,
        DragDropModule
    ],
    templateUrl: './shotlist.component.html',
    styleUrls: ['./shotlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShotlistComponent extends Destroy {

    protected isEditable = false;

    protected keywords = ['Scène', 'Plan', 'Valeur de plan', 'Angle', 'Mouvement', 'Objectif', 'Ouverture', 'Acteurs', 'Description', 'Temps Estim.'];

    public constructor(private dialog: MatDialog,
        public shotlistService: ShotlistService) {
        super();
    }

    protected openDialog(): void {
        this.shotlistService.isShotEditable = true;
        const shot: Shot = {
            arrayIndex: this.shotlistService.shotListLength,
            scene: '',
            shot: '',
            description: '',
            shotSize: '',
            shotType: '',
            movement: '',
            estTime: '',
            lens: '',
            aperture: '',
            sceneId: '',
            shotId: ''
        };
        this.dialog.open(ShotDialogComponent, {
            data: shot
        });
    }

    protected openInfo(shot: Shot): void {
        this.shotlistService.isShotEditable = false;
        this.dialog.open(ShotDialogComponent, {
            data: shot
        });
    }

    protected drop(event: CdkDragDrop<Shot[]>, shotList: Shot[]): void {
        moveItemInArray(shotList, event.previousIndex, event.currentIndex);
        this.shotlistService.saveShotList$(shotList).pipe(
            takeUntil(this.destroyed$)
        ).subscribe();

    }
}
