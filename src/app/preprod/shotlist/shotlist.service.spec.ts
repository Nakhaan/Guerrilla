import { TestBed } from '@angular/core/testing';

import { ShotlistService } from './shotlist.service';

describe('ShotlistService', () => {
    let service: ShotlistService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShotlistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
