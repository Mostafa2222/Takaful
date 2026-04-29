import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../../../services/environment.service';
import { PageResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public env: EnvironmentService) { }

  getUsers(params: any) {
    return this.http.get<PageResponse<User>>(this.env.apiUrl + 'users', { params: params });
  }

  create(user: any) {
    return this.http.post(this.env.apiUrl + 'users/add', user);
  }

  update(userId: number, data: any) {
    return this.http.put(
      this.env.apiUrl + `users/${userId}`,
      data
    );
  }

  delete(id: number) {
    return this.http.delete(this.env.apiUrl + `users/${id}`);
  }
}
