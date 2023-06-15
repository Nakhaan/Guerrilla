import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-preprod',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule
    ],
    templateUrl: './preprod.component.html',
    styleUrls: ['./preprod.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreprodComponent {

}
