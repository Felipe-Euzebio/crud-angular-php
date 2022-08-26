import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  testGetUsers(): Observable<any> {
    
    return this.http.get(`${API_CONFIG.baseUrl}`);

  }

  api(dados: any, api: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      }),
    }
    const url = `${API_CONFIG.baseUrl}/${api}`;
    return this.http.post(url, JSON.stringify(dados), httpOptions).pipe(map(res => res));
  }

}
