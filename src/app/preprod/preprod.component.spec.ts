import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprodComponent } from './preprod.component';

describe('PreprodComponent', () => {
    let component: PreprodComponent;
    let fixture: ComponentFixture<PreprodComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PreprodComponent]
        });
        fixture = TestBed.createComponent(PreprodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
