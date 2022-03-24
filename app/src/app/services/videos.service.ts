import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideosResponse } from '../model/video';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LocallyResponse } from '../model/locally';

const BASE_URL = 'http://localhost:3000/v1'

@Injectable({
    providedIn: 'root'
})
export class VideosService {

    constructor(private http: HttpClient) {

    }

    getVideos(filter: String): Observable<VideosResponse> {
        return this.http.get<VideosResponse>(`${BASE_URL}/videos?filter=${filter}`);
    }

    getLocally(): Observable<LocallyResponse> {
        return this.http.get<LocallyResponse>(`${BASE_URL}/locally`);
    }


}
