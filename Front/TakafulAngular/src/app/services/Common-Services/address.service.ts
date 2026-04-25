import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private http: HttpClient,public _environmentService: EnvironmentService, private authService: AuthService) {}

  public getMyAddresses() {
    let url = this._environmentService.apiUrl +'addresses/my';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'
      ,'Authorization': "Bearer " + this.authService.getToken()});
    return this.http.get<any[]>(url, { headers });
  }
}
