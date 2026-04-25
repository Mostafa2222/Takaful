import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from '../../../../services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(
    private http: HttpClient,
    private env: EnvironmentService
  ) {}

  private base = this.env.apiUrl + 'memberships';

  getAll(params?: any) {
   
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined)
        httpParams = httpParams.set('page', params.page);

      if (params.size !== undefined)
        httpParams = httpParams.set('size', params.size);

      if (params.search)
        httpParams = httpParams.set('search', params.search);

      if (params.isActive !== undefined)
        httpParams = httpParams.set('isActive', params.isActive);
    }

    return this.http.get<any>(this.base, { params: httpParams });
  }

  getDurationTypes() {
    return this.http.get<string[]>(this.base + '/duration-types');
  }
  create(data: any) {
    return this.http.post(this.base, data);
  }

  update(id: string, data: any) {
    return this.http.put(`${this.base}/${id}`, data);
  }


  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }

  toggle(id: string) {
    return this.http.patch(`${this.base}/${id}/toggle`, {});
  }

  reorder(ids: string[]) {
    return this.http.post(
      this.base + '/reorder',
      ids
    );
  }

}