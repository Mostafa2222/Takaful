import { Component } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { TranslateService } from '@ngx-translate/core';
import { Permission, PermissionGroup } from '../users/models/user.model'
import { AlertService } from '../../../helper/Services/alert.service';
@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrl: './roles-permissions.component.css'
})
export class RolesPermissionsComponent {

  roles: any[] = [];
  groups: PermissionGroup[] = [];
  selectedRole: any;
  selectedPermissions: string[] = [];
  permissionMap: Record<string, Permission> = {};
  showModal: boolean = false;
  editingRole: any = null;
  roleNameAr: string = '';
  roleNameEn: string = '';
  currentLang = this.translate.currentLang || 'ar';
  search: string = '';
  activeTab: string = '';

  constructor(private roleService: RoleService,
    private translate: TranslateService, private _alertService: AlertService) { }

  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();

    this.currentLang = this.translate.currentLang || 'ar';

    this.translate.onLangChange.subscribe((res) => {
      this.currentLang = res.lang;
    });
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  get modalTitle(): string {
    return this.editingRole
      ? 'sidebar.roles_page.roles_modal.edit'
      : 'sidebar.roles_page.roles_modal.add';
  }
  getPermissionName(code: unknown): string {
    const key = code as string;

    const p = this.permissionMap[key];
    if (!p) return key;

    return this.currentLang === 'ar' ? p.nameAr : p.nameEn;
  }
  setActiveTab(group: string) {
    this.activeTab = group;
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(res => this.roles = res);
  }

  loadPermissions() {
    this.roleService.getPermissionsGrouped().subscribe(res => {
      this.groups = res;
      this.permissionMap = {};
      this.groups.forEach(g => {
        g.permissions.forEach(p => {
          this.permissionMap[p.code] = p;
        });
      });
      if (this.groups.length) {
        this.activeTab = this.groups[0].group;
      }
    });
  }

  getVisibleGroups(): PermissionGroup[] {
    if (!this.search) return this.groups;

    return this.groups
      .map((g: PermissionGroup) => ({
        ...g,
        permissions: g.permissions.filter((p: Permission) =>
          p.nameAr?.includes(this.search) ||
          p.nameEn?.toLowerCase().includes(this.search.toLowerCase())
        )
      }))
      .filter((g: PermissionGroup) => g.permissions.length > 0);
  }
  filterPermissions(perms: any[]) {
    if (!this.search) return perms;

    return perms.filter(p =>
      p.nameAr?.includes(this.search) ||
      p.nameEn?.toLowerCase().includes(this.search.toLowerCase())
    );
  }
  selectRole(role: any) {
    this.selectedRole = role;
    this.selectedPermissions = [...role.permissions];
  }

  togglePermission(code: string) {
    if (this.selectedPermissions.includes(code)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== code);
    } else {
      this.selectedPermissions = [...this.selectedPermissions, code];
    }
  }

  isAllSelected(group: PermissionGroup): boolean {
    const codes = group.permissions.map(p => p.code);
    return codes.every(c => this.selectedPermissions.includes(c));
  }

  isGroupSelected(group: PermissionGroup): boolean {
    return group.permissions.some(p =>
      this.selectedPermissions.includes(p.code)
    );
  }
  toggleSelectAll(group: PermissionGroup) {
    const codes = group.permissions.map(p => p.code);

    if (this.isAllSelected(group)) {
      this.selectedPermissions = this.selectedPermissions.filter(p => !codes.includes(p));
    } else {
      this.selectedPermissions = [...new Set([...this.selectedPermissions, ...codes])];
    }
  }

  isTabSelected(group: PermissionGroup): boolean {
    return group.permissions.some(p => this.selectedPermissions.includes(p.code));
  }

  onKeyDown(event: KeyboardEvent) {
    const visible = this.getVisibleGroups();
    const currentIndex = visible.findIndex(g => g.group === this.activeTab);

    if (event.key === 'ArrowRight') {
      const next = (currentIndex + 1) % visible.length;
      this.activeTab = visible[next].group;
    }

    if (event.key === 'ArrowLeft') {
      const prev = (currentIndex - 1 + visible.length) % visible.length;
      this.activeTab = visible[prev].group;
    }
  }

  openCreateModal() {
    this.editingRole = null;
    this.roleNameAr = '';
    this.roleNameEn = '';
    this.selectedPermissions = [];
    this.showModal = true;
  }

  edit(role: any) {
    this.editingRole = role;
    this.roleNameAr = role.nameAr;
    this.roleNameEn = role.nameEn;
    this.selectedPermissions = [...role.permissions];
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  submit() {
    const payload = {
      nameAr: this.roleNameAr,
      nameEn: this.roleNameEn,
      permissions: this.selectedPermissions
    };

    this._alertService.loading();

    const request = this.editingRole
      ? this.roleService.updateRolePermissions(this.editingRole.id, payload)
      : this.roleService.createRole(payload);

    request.subscribe({
      next: () => {
        this._alertService.close();
        this._alertService.success(this.translate.instant('messages.success.saved'));
        this.close();
        this.loadRoles();
      },
      error: (err) => {
        this._alertService.close();
        this._alertService.error(this.handleError(err));
      }
    });
  }

  delete(role: any) {
    this._alertService.confirm(
      this.translate.instant('messages.success.confirm_delete')
    ).then(confirmed => {
      if (!confirmed) return;

      this._alertService.loading();

      this.roleService.deleteRole(role.id).subscribe({
        next: () => {
          this._alertService.close();
          this._alertService.success(this.translate.instant('messages.success.deleted'));
          this.loadRoles();
        },
        error: (err) => {
          this._alertService.close();
          this._alertService.error(this.handleError(err));
        }
      });
    });
  }

  public handleError(err: any): string {
    if (err.status === 0) return this.translate.instant('messages.errors.server_down');
    if (err.status === 401) return this.translate.instant('messages.errors.invalid_credentials');
    if (err.status === 403) return this.translate.instant('messages.errors.forbidden');
    return this.translate.instant('messages.errors.unknown');
  }

}
