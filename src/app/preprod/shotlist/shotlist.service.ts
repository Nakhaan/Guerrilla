import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { Shot } from './model/shot.model';

@Injectable({
    providedIn: 'root'
})
export class ShotlistService {

    public shotList$: Observable<Shot[]>;
    public shotListRefresh$ = new BehaviorSubject<void>(undefined as void);

    private apiUrl = 'http://localhost:8080';

    public constructor(private http: HttpClient) {

        this.shotList$ = this.shotListRefresh$.pipe(
            switchMap(() => this.getShots$().pipe(
                map(shotList => shotList.sort((shota, shotb) => shota.arrayIndex - shotb.arrayIndex))
            ))
        );
        this.shotListRefresh$.next();
    }

    public getShots$(): Observable<Shot[]> {
        return this.http.get<Shot[]>(`${this.apiUrl}/shots`);
    }

    public saveShotList$(shotList: Shot[]): Observable<Shot[]> {
        return this.http.post<Shot[]>(`${this.apiUrl}/shots/save/list`, shotList);
    }

    public updatepdateShot$(shot: Shot): Observable<Shot> {
        return this.http.put<Shot>(`${this.apiUrl}/shots`, shot);
    }
}
