import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../environment.service';
import { AuthService } from '../../core/services/auth.service';
import { LocationDto } from '../../DTO/locationDTO';
@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private http: HttpClient, public _environmentService: EnvironmentService, private authService: AuthService) { }
  // public search(query: string) {
  //   let url = this._environmentService.apiUrl + `locations/search?query=${query}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //     , 'Authorization': "Bearer " + this.authService.getToken()
  //   });
  //   return this.http.get<any[]>(url, { headers });
  // }


  search(query: string) {
    console.warn("query", query);
    
    return this.http.get<LocationDto[]>(
      `${this._environmentService.apiUrl}locations/search?query=${query}`
    );
  }

  getCountries() {
    return this.http.get<any[]>(
      `${this._environmentService.apiUrl}locations/countries`
    );
  }

  getStates(countryCode: string) {
    return this.http.get<any[]>(
      `${this._environmentService.apiUrl}locations/states/${countryCode}`
    );
  }

  getCities(stateCode: string) {
    return this.http.get<any[]>(
      `${this._environmentService.apiUrl}locations/cities/${stateCode}`
    );
  }
}