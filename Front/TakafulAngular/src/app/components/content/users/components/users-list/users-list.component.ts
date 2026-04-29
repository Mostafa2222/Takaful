import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import jsPDF from 'jspdf';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { AlertService } from '../../../../../helper/Services/alert.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  editingUser: any = null;

  users: any[] = [];
  page = 0;
  size = 5;
  totalPages = 0;
  roles: any[] = [];
  loading = false;

  search = ' ';
  private _debounce: any;
  filters: any = {};
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  showModal = false;
  currentLang = this.translate.currentLang || 'ar';

  showColumnsMenu = false;
  allColumns = [
    { field: 'formattedUserKey', label: 'sidebar.users_page.users_table.ID', visible: true },
    { field: 'nameAr', label: 'sidebar.users_page.users_table.nameAr', visible: true },
    { field: 'nameEn', label: 'sidebar.users_page.users_table.nameEn', visible: true },
    { field: 'username', label: 'sidebar.users_page.users_table.username', visible: true },
    { field: 'phone', label: 'sidebar.users_page.users_table.phone', visible: true },
    // { field: 'country', label: 'sidebar.users_page.users_table.country', visible: true },
    // { field: 'city', label: 'sidebar.users_page.users_table.city', visible: true },
    { field: 'email', label: 'sidebar.users_page.users_table.email', visible: true },
    { field: 'role', label: 'sidebar.users_page.users_table.role', visible: true },
    { field: 'isActive', label: 'sidebar.users_page.users_table.isActive', visible: true },
    { field: 'canPrint', label: 'sidebar.users_page.users_table.canPrint', visible: true },
    { field: 'operations', label: 'sidebar.users_page.users_table.operations', visible: true },
  ];
  get visibleColumns() {
    return this.allColumns.filter((c) => c.visible);
  }
  form = this.fb.group({
    nameAr: ['', Validators.required],
    nameEn: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['', Validators.required],
    // country: ['', Validators.required],
    // city: ['', Validators.required],
    email: ['', [Validators.email]],
    password: ['', Validators.required],
    roleId: [null, Validators.required],
    isActive: [true],
    canPrint: [false],
  });
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private _authService: AuthService,
    private _alertService: AlertService
  ) { }
  ngOnInit() {
    this.initColumns();
    this.loadUsers();
    this.loadRoles();

    this.currentLang = this.translate.currentLang || 'ar';

    this.translate.onLangChange.subscribe((res) => {
      this.currentLang = res.lang;
      this.initColumns();
    });
  }

  initColumns() {
    this.allColumns = [
      { field: 'formattedUserKey', label: this.translate.instant('sidebar.users_page.users_table.ID'), visible: true },
      { field: 'nameAr', label: this.translate.instant('sidebar.users_page.users_table.nameAr'), visible: true },
      { field: 'nameEn', label: this.translate.instant('sidebar.users_page.users_table.nameEn'), visible: true },
      { field: 'username', label: this.translate.instant('sidebar.users_page.users_table.username'), visible: true },
      { field: 'phone', label: this.translate.instant('sidebar.users_page.users_table.phone'), visible: true },
      // { field: 'country', label: this.translate.instant('sidebar.users_page.users_table.country'), visible: true },
      // { field: 'city', label: this.translate.instant('sidebar.users_page.users_table.city'), visible: true },
      { field: 'email', label: this.translate.instant('sidebar.users_page.users_table.email'), visible: true },
      { field: 'role', label: this.translate.instant('sidebar.users_page.users_table.role'), visible: true },
      { field: 'isActive', label: this.translate.instant('sidebar.users_page.users_table.isActive'), visible: true },
      { field: 'canPrint', label: this.translate.instant('sidebar.users_page.users_table.canPrint'), visible: true },
      { field: 'operations', label: this.translate.instant('sidebar.users_page.users_table.operations'), visible: true }
    ];
  }
  loadUsers() {
    const params: any = {
      page: this.page,
      size: this.size
    };

    if (!this.search || this.search.trim() === '') {
      params.search = null;
    }
    if (this.search) {
      params.search = this.search;
    }

    if (this.sortField) {
      params.sort = this.sortField;
      params.direction = this.sortDirection;
    }

    this.userService.getUsers(params).subscribe(res => {
      this.users = res.content;
      this.totalPages = res.totalPages;
    });
  }

  loadRoles() {
    this.roleService.getRoles().subscribe((res) => {

      const permissions = this._authService.getPermissions();
      const isAdmin = permissions.includes('MANAGE_ROLES');

      if (isAdmin) {
        this.roles = res;
      } else {
        this.roles = res.filter(r => r.nameEn === 'AGENT');
      }
    });
  }

  onSearch(event: any) {
    clearTimeout(this._debounce);

    this._debounce = setTimeout(() => {
      this.search = event.target.value;
      this.page = 0;
      this.loadUsers();
    }, 400);
  }

  toggleColumnsMenu() {
    this.showColumnsMenu = !this.showColumnsMenu;
  }

  toggleColumn(col: any) {
    col.visible = !col.visible;
  }

  onColumnFilter(field: string, event: any) {
    this.filters[field] = event.target.value;
    this.loadUsers();
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    this.loadUsers();
  }

  next() {
    this.page++;
    this.loadUsers();
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.loadUsers();
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      xlsx.writeFile(workbook, 'users.xlsx');
    });
  }

  exportPDF() {
    const doc = new jsPDF();

    doc.text('Users Report', 10, 10);

    this.users.forEach((u, i) => {
      doc.text(`${u.nameAr} - ${u.phone}`, 10, 20 + (i * 10));
    });

    doc.save('users.pdf');
  }

  openModal() {
  this.editingUser = null;

  this.form.reset({
    isActive: true,
    canPrint: false
  });

  this.showModal = true;
}

  close() {
  this.showModal = false;
  this.editingUser = null;
}

  edit(user: any) {
    this.editingUser = user;

    this.form.patchValue({
      nameAr: user.nameAr,
      nameEn: user.nameEn,
      username: user.username,
      phone: user.phone,
      // country: user.country,
      // city: user.city,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      isActive: user.isActive,
      canPrint: user.canPrint
    });

    this.showModal = true;
  }
  delete(user: any) {
    this._alertService.confirm(
      this.translate.instant('messages.success.confirm_delete')
    ).then(confirmed => {

      if (!confirmed) return;

      this._alertService.loading();

      this.userService.delete(user.id).subscribe({
        next: () => {
          this._alertService.close();
          this._alertService.success(
            this.translate.instant('messages.success.deleted')
          );
          this.loadUsers();
        },
        error: (err) => {
          this._alertService.close();
          this._alertService.error(this.handleError(err));
        }
      });

    });
  }


  submit() {
    const payload = this.form.value;

    this._alertService.loading();

    const request = this.editingUser
      ? this.userService.update(this.editingUser.id, payload)
      : this.userService.create(payload);

    request.subscribe({
      next: () => {
        this._alertService.close();
        this._alertService.success(
          this.translate.instant('messages.success.saved')
        );

        this.close();
        this.loadUsers();
      },
      error: (err) => {
        this._alertService.close();
        this._alertService.error(this.handleError(err));
      }
    });
  }

  handleError(err: any): string {
    if (err.status === 0) return this.translate.instant('messages.errors.server_down');
    if (err.status === 401) return this.translate.instant('messages.errors.invalid_credentials');
    if (err.status === 403) return this.translate.instant('messages.errors.forbidden');
    return this.translate.instant('messages.errors.unknown');
  }
}
