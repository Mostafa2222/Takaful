import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TakafulProject';

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'ar';

  this.translate.setDefaultLang('ar');
  this.translate.use(lang);

  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

}
