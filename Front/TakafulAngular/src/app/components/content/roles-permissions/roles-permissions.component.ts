import { Component } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrl: './roles-permissions.component.css'
})
export class RolesPermissionsComponent {

  roles: any[] = [];
  groups: any[] = [];
  selectedRole: any;
  selectedPermissions: string[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(res => this.roles = res);
  }

  loadPermissions() {
    this.roleService.getPermissionsGrouped().subscribe(res => {
      this.groups = res;
    });
  }

  selectRole(role: any) {
    this.selectedRole = role;
    this.selectedPermissions = [...role.permissions];
  }

  togglePermission(code: string) {
    if (this.selectedPermissions.includes(code)) {
      this.selectedPermissions =
        this.selectedPermissions.filter(p => p !== code);
    } else {
      this.selectedPermissions.push(code);
    }
  }

  save() {
    this.roleService.updateRolePermissions(
      this.selectedRole.id,
      this.selectedPermissions
    ).subscribe(() => alert("Saved"));
  }
}
