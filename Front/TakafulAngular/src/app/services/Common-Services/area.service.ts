import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AreaService {

  constructor(private http: HttpClient, public _environmentService: EnvironmentService,
    private authService: AuthService) { }

  public getAreas() {
    let url = this._environmentService.apiUrl + 'areas';
    console.warn(url);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': "Bearer " + this.authService.getToken()
    });
    console.warn("token", this.authService.getToken());
    
    return this.http.get<any[]>(url, { headers });
  }
}
