import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(private translate: TranslateService) {}

  setLanguage(lang: 'ar' | 'en') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  getLanguage(): 'ar' | 'en' {
    return (localStorage.getItem('lang') as 'ar' | 'en') || 'ar';
  }
}
