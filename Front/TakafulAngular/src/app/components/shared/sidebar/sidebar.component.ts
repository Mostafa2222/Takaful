import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../helper/Services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  menu: any[] = [];
  collapsed = false;
  loading = true;
  mobileOpen = false;
  permissions: string[] = [];
  theme: 'dark' | 'light' = 'dark';
  currentLang: 'ar' | 'en' | any = 'ar';
  userMenuOpen = false;
  user: any;

  get userName() {
    const user = this.getUserFromToken();
    return user?.name;
  }
  constructor(
    private sidebarService: SidebarService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentLang = this.translate.currentLang || 'ar';
    const currentUrl = window.location.pathname;
    this.user = this.getUserFromToken();
    this.translate.onLangChange.subscribe(() => {
      this.user = this.getUserFromToken();
    });
    this.sidebarService.getMenu().subscribe({
      next: (res) => {
        this.menu = this.filterMenuByPermissions(res);
        this.loading = false;
      },
      error: () => (this.loading = false),
    });

    this.menu.forEach((item) => {
      if (item.children?.some((c: any) => currentUrl.includes(c.route))) {
        item.open = true;
      }
    });
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    this.theme = saved ?? 'dark';
    document.body.setAttribute('data-theme', this.theme);
  }

  filterMenuByPermissions(menu: any[]): any[] {
    const permissions = this.authService.getPermissions();

    return menu
      .map((item) => {
        // فلترة children
        const filteredChildren =
          item.children?.filter(
            (child: any) =>
              !child.permissionCode ||
              permissions.includes(child.permissionCode)
          ) || [];

        // لو parent نفسه له permission
        const hasAccessToParent =
          !item.permissionCode || permissions.includes(item.permissionCode);

        // الحالة 1: parent عنده children بعد الفلترة
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }

        // الحالة 2: parent بدون children لكن عنده access
        if (hasAccessToParent && !item.children?.length) {
          return item;
        }

        return null;
      })
      .filter(Boolean);
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
  toggleItem(item: any) {
    if (item.children?.length) {
      item.open = !item.open;
    } else if (item.route) {
    }
  }
  toggleLang() {
    this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(this.currentLang);
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', this.currentLang);
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }

  getUserFromToken() {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      let base64 = token.split('.')[1];
      base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

      const payload = JSON.parse(atob(base64));

      const lang = localStorage.getItem('lang') || 'ar';


      return {
        name: lang === 'ar' ? decodeURIComponent(escape(payload.nameAr)) : payload.nameEn,
        roleName: lang === 'ar' ? decodeURIComponent(escape(payload.roleNameAr)) : payload.roleNameEn
      };

    } catch (e) {
      console.error('Decode error', e);
      return null;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!event.target.closest('.user-card')) {
      this.userMenuOpen = false;
    }
  }
}
