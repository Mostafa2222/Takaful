import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private cachedPermissions: string[] = [];
  constructor(private http: HttpClient, public env: EnvironmentService) { }

  // login(phone: string) {
  //   return this.http.post(this.env.apiUrl + 'login?phone=' + phone, {}, {
  //     responseType: 'text'
  //   });
  // }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(this.env.apiUrl + 'login', {
      username,
      password
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getPermissions(): string[] {
    if (this.cachedPermissions.length) return this.cachedPermissions;

    const token = this.getToken();
    if (!token || token.split('.').length !== 3) return [];

    try {
      let base64 = token.split('.')[1];
      base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

      const payload = JSON.parse(atob(base64));

      this.cachedPermissions = payload.permissions || [];
      return this.cachedPermissions;

    } catch {
      return [];
    }
  }

  getPermissionsGrouped() {
    return this.http.get<any[]>(this.env.apiUrl + 'permissions/grouped');
  }

  getRoles() {
    return this.http.get<any[]>(this.env.apiUrl + 'roles');
  }

  updateRolePermissions(roleId: number, permissions: string[]) {
    return this.http.put(
      this.env.apiUrl + `roles/${roleId}/permissions`,
      permissions
    );
  }
}
