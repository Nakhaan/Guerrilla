import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotlistComponent } from './shotlist.component';

describe('ShotlistComponent', () => {
    let component: ShotlistComponent;
    let fixture: ComponentFixture<ShotlistComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ShotlistComponent]
        });
        fixture = TestBed.createComponent(ShotlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
