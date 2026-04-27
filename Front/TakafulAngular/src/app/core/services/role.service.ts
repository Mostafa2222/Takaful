import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';

@Injectable({ providedIn: 'root' })
export class RoleService {

  constructor(private http: HttpClient, private env: EnvironmentService) {}

  getPermissionsGrouped() {
    return this.http.get<any[]>(this.env.apiUrl + 'permissions/grouped');
  }

  getRoles() {
    return this.http.get<any[]>(this.env.apiUrl + 'roles');
  }

  updateRolePermissions(roleId: number, data: any) {
    return this.http.put(
      this.env.apiUrl + `roles/${roleId}/permissions`,
      data
    );
  }

  createRole(data: any) {
    return this.http.post(this.env.apiUrl + 'roles', data);
  }

  deleteRole(id: number) {
    return this.http.delete(this.env.apiUrl + `roles/${id}`);
  }
}
