import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Shot } from './model/shot.model';

@Injectable({
    providedIn: 'root'
})
export class ShotlistService {

    private apiUrl = 'http://localhost:8080';

    public constructor(private http: HttpClient) { }

    public getShots$(): Observable<Shot[]> {
        return this.http.get<Shot[]>(`${this.apiUrl}/shots`);
    }

    public saveShotList$(shotList: Shot[]): Observable<Shot[]> {
        return this.http.post<Shot[]>(`${this.apiUrl}/shots/save/list`, shotList);
    }
}
