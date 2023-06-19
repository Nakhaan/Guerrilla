import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { takeUntil } from 'rxjs';

import { Destroy } from 'src/app/commons/destroy';

import { Shot } from '../model/shot.model';
import { ShotlistService } from '../shotlist.service';

interface ShotForm {
    scene: FormControl<string | undefined | null>;
    shot: FormControl<string | undefined | null>;
    description: FormControl<string | undefined | null>;
    shotSize: FormControl<string | undefined | null>;
    shotType: FormControl<string | undefined | null>;
    movement: FormControl<string | undefined | null>;
    estTime: FormControl<string | undefined | null>;
    lens: FormControl<string | undefined | null>;
    aperture: FormControl<string | undefined | null>;
}

@Component({
    selector: 'app-shot-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    templateUrl: './shot-dialog.component.html',
    styleUrls: ['./shot-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShotDialogComponent extends Destroy {

    protected isEditable = false;

    protected shotInputsForm = new FormGroup<ShotForm>({
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
        protected shotlistService: ShotlistService,
        private ref: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: Shot
    ) {
        super();
    }

    protected onEdit(): void {
        this.isEditable = !this.isEditable;
    }

    protected onSave(shotInputsForm: FormGroup<ShotForm>): void {
        const shotInputs = shotInputsForm.getRawValue();
        const shot: Shot = {
            id: this.data.id,
            arrayIndex: this.data.arrayIndex,
            scene: shotInputs.scene || '' || '',
            shot: shotInputs.shot || '',
            description: shotInputs.description || '',
            shotSize: shotInputs.shotSize || '',
            shotType: shotInputs.shotType || '',
            movement: shotInputs.movement || '',
            estTime: shotInputs.estTime || '',
            lens: shotInputs.lens || '',
            aperture: shotInputs.aperture || '',
            sceneId: this.data.sceneId,
            shotId: this.data.shotId
        };
        this.shotlistService.updatepdateShot$(shot).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.data = shot;
            this.ref.markForCheck();
            return this.shotlistService.shotListRefresh$.next();
        });
        this.isEditable = !this.isEditable;

    }

}
