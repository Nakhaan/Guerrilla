import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { Shot } from '../model/shot.model';

@Component({
    selector: 'app-shot-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatListModule,
        MatCardModule
    ],
    templateUrl: './shot-dialog.component.html',
    styleUrls: ['./shot-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShotDialogComponent {

    protected shotInputs = new FormGroup({
        scene: new FormControl<string | undefined>(this.data.scene),
        shot: new FormControl<string | undefined>(this.data.shot),
        description: new FormControl<string | undefined>(this.data.description),
        shotSize: new FormControl<string | undefined>(this.data.shotSize),
        shotType: new FormControl<string | undefined>(this.data.shotType),
        movement: new FormControl<string | undefined>(this.data.movement),
        estTime: new FormControl<string | undefined>(this.data.estTime),
        lens: new FormControl<string | undefined>(this.data.lens),
        aperture: new FormControl<string | undefined>(this.data.aperture)
    });

    public constructor(
        public dialogRef: MatDialogRef<ShotDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Shot
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
