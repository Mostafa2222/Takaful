import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import jsPDF from 'jspdf';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../../../../core/services/role.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users: any[] = [];
  page = 0;
  size = 2;
  totalPages = 0;
  roles: any[] = [];
  loading = false;

  search = ' ';
  private _debounce: any;
  filters: any = {};
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  showModal = false;
  
  showColumnsMenu = false;
  allColumns = [
    { field: 'id', label: 'sidebar.users_page.users_table.ID', visible: true },
    { field: 'nameAr', label: 'sidebar.users_page.users_table.name', visible: true },
    { field: 'phone', label: 'sidebar.users_page.users_table.phone', visible: true },
    { field: 'email', label: 'sidebar.users_page.users_table.email', visible: true },
    { field: 'role', label: 'sidebar.users_page.users_table.role', visible: true },
    { field: 'status', label: 'sidebar.users_page.users_table.status', visible: true },
  ];
  get visibleColumns() {
    return this.allColumns.filter((c) => c.visible);
  }
  form = this.fb.group({
    nameAr: ['', Validators.required],
    lastNameAr: [''],
    username: ['', Validators.required],
    phone: ['', Validators.required],
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
    private _authService: AuthService
  ) {}
  ngOnInit() {
    this.initColumns();
    this.loadUsers();
    this.loadRoles();
    this.translate.onLangChange.subscribe(() => {
      this.initColumns();
    });
  }

  initColumns() {
    this.allColumns = [
      { field: 'id', label: this.translate.instant('sidebar.users_page.users_table.ID'), visible: true },
      { field: 'nameAr', label: this.translate.instant('sidebar.users_page.users_table.name'), visible: true },
      { field: 'phone', label: this.translate.instant('sidebar.users_page.users_table.phone'), visible: true },
      { field: 'email', label: this.translate.instant('sidebar.users_page.users_table.email'), visible: true },
      { field: 'role', label: this.translate.instant('sidebar.users_page.users_table.role'), visible: true },
      { field: 'status', label: this.translate.instant('sidebar.users_page.users_table.status'), visible: true },
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

    const permissions = this._authService.getPermissions(); // 👈 مهم
    const isAdmin = permissions.includes('MANAGE_USERS'); // أو ROLE_ADMIN

    if (isAdmin) {
      this.roles = res;
    } else {
      // 👇 فلترة (حسب الاسم أو ID)
      this.roles = res.filter(r => r.name === 'AGENT');
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
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  submit() {
    this.userService.create(this.form.value).subscribe(() => {
      this.close();
      this.loadUsers();
    });
  }
}
