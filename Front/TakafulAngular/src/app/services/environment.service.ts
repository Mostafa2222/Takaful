import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  /*public apiUrl= 'http://localhost:5006/emp/api/'
  public publicUrl= 'http://localhost:5006/emp/api/public/'
  public swagUrl= 'http://localhost:5006/emp/'
  public secUrl='http://192.168.1.32:8080/DMS-SEC-WS/ws/security/'*/

  private config: any;
  constructor(private http: HttpClient) { }

  loadConfig(): Observable<any> {
    // return this.http.get('/Front/Org/assets/configurations/config.json').pipe(
       return this.http.get('/assets/configurations/config.json').pipe(
      tap(config => {
        this.config = config;
      })
    );
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

}
