import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../../../services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  create(data: any) {
    return this.http.post(
      this.env.apiUrl + 'locations',
      data
    );
  }
  getCountries() {
    return this.http.get<any[]>(this.env.apiUrl + 'locations/countries');
  }

  search(query: string) {
    return this.http.get<any[]>(this.env.apiUrl + `locations/search?query=${query}`);
  }
  
  getChildren(parentId: string) {
    return this.http.get<any[]>(this.env.apiUrl + `locations/${parentId}/children`);
  }

}