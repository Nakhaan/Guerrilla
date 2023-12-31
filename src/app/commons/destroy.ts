import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Directive()
export class Destroy implements OnDestroy {

    protected destroyed$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
