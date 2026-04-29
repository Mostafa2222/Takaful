import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  htmlContent: any = null;
  constructor(private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    fetch('assets/website/template/home.html')
      .then(res => res.text())
      .then(html => {
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit() {
    const observer = new MutationObserver(() => {
      const el = document.querySelector('.hero-title');

      if (el) {
        (window as any).initWebsite();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  ngAfterViewChecked() {
    if (this.htmlContent && !(window as any)._initDone) {
      (window as any)._initDone = true;

      setTimeout(() => {
        requestAnimationFrame(() => {
          (window as any).initWebsite();
        });
      }, 0);
    }
  }
  // ngAfterViewInit() {

  //   setTimeout(() => {
  //     console.log('init js'); // 👈 تأكد
  //     (window as any).initWebsite?.();
  //   }, 500);
  //   setTimeout(() => {
  //     (window as any).initWebsite?.();
  //   });
  // }

  //   ngAfterViewChecked() {
  //   if (this.htmlContent && !(window as any)._initDone) {
  //     (window as any)._initDone = true;

  //     setTimeout(() => {
  //       console.log('init after render');
  //       (window as any).initWebsite();
  //     }, 0);
  //   }
  // }
  /*
     lang: string = 'ar';
    activeSlide: number = 2;
    activeTab: string = 'home';
    heroTimer: any = null;
  
    I18N: any = {
      ar: {
        brand: 'تكافل العربية',
        city: 'الرياض',
        'hero.title': 'رعاية صحية متميزة',
        'hero.desc': 'تغطية شاملة لجميع احتياجاتك الطبية',
        'promo.title': 'إصدار عضوية تكافل العربية',
        'promo.desc': 'سجّل الآن واستمتع بتغطية كاملة في المستشفيات والمراكز والصيدليات',
        'promo.cta': 'ابدأ الآن',
        'mn.title': 'الشبكة الطبية',
        'mn.sub': 'تصفح المستشفيات والعيادات المعتمدة',
        'mn.cta': 'عرض الشبكة',
      },
      en: {
        brand: 'Takaful Arabia',
        city: 'Riyadh',
        'hero.title': 'Premium Healthcare',
        'hero.desc': 'Comprehensive coverage for all your medical needs',
        'promo.title': 'Get your Takaful Arabia membership',
        'promo.desc': 'Sign up today and enjoy full coverage at hospitals, centers, and pharmacies nationwide',
        'promo.cta': 'Start now',
        'mn.title': 'Medical Network',
        'mn.sub': 'Browse accredited hospitals and medical clinics',
        'mn.cta': 'View Network',
      }
    };
  
    quickActions = [
      { key: 'homecare', src: '../../../../../assets/website/images/container-1.svg' },
      { key: 'hospitals', src: '../../../../../assets/website/images/container-2.svg' },
      { key: 'general', src: '../../../../../assets/website/images/container.svg' },
      { key: 'dental', src: '../../../../../assets/website/images/container-3.svg' },
      { key: 'pharmacies', src: '../../../../../assets/website/images/container-4.svg' }
    ];
  
    tabs = [
      { key: 'home', src: '../../../../../assets/website/images/icon-3.svg' },
      { key: 'map', src: '../../../../../assets/website/images/icon-4.svg' },
      { key: 'paid', src: '../../../../../assets/website/images/icon.svg' },
      { key: 'wallet', src: '../../../../../assets/website/images/icon-2.svg' },
      { key: 'more', src: '../../../../../assets/website/images/icon-1.svg' }
    ];
  
    HERO_SLIDES = 4;
    HERO_IMAGE = 'assets/hero-doctor.png';
  
    constructor() {
      try {
        this.lang = localStorage.getItem('ta_lang_ar') || 'ar';
      } catch (e) {
        this.lang = 'ar';
      }
    }
  
    ngOnInit(): void {
      this.applyDirAndLang();
      this.buildHero();
      this.buildQuickActions();
      this.buildTabs();
      this.restartHeroTimer();
    }
  
    ngOnDestroy(): void {
      if (this.heroTimer) {
        clearInterval(this.heroTimer);
      }
    }
  
  
    t(key: string): string {
      const dict = this.I18N[this.lang] || this.I18N.ar;
      if (dict.hasOwnProperty(key)) {
        return dict[key];
      }
      const nested = key.split('.').reduce((o: any, k: string) => (o == null ? o : o[k]), dict);
      return nested == null ? key : nested;
    }
    applyDirAndLang(): void {
      const dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      const root = document.documentElement;
      root.lang = this.lang;
      root.dir = dir;
      const body = document.body;
      body.dir = dir;
      document.title = this.lang === 'ar'
        ? 'تكافل العربية | Takaful Arabia'
        : 'Takaful Arabia | تكافل العربية';
    }
  
    buildHero(): void {
      const track = document.getElementById('heroTrack');
      const dotsWrap = document.getElementById('heroDots');
      if (!track || !dotsWrap) return;
  
      track.innerHTML = '';
      dotsWrap.innerHTML = '';
  
      for (let i = 0; i < this.HERO_SLIDES; i++) {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.style.backgroundImage = `url("${this.HERO_IMAGE}")`;
        slide.setAttribute('aria-hidden', i === this.activeSlide ? 'false' : 'true');
        track.appendChild(slide);
  
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-dot' + (i === this.activeSlide ? ' active' : '');
        dot.setAttribute('aria-label', (this.lang === 'ar' ? 'الشريحة ' : 'Slide ') + (i + 1));
        dot.addEventListener('click', () => this.setSlide(i, true));
        dotsWrap.appendChild(dot);
      }
      this.updateHeroPosition();
    }
  
   
    updateHeroPosition(): void {
      const track = document.getElementById('heroTrack');
      if (!track) return;
      const offset = this.activeSlide * 100;
      if (this.lang === 'ar') {
        track.style.transform = `translateX(${offset}%)`;
      } else {
        track.style.transform = `translateX(-${offset}%)`;
      }
    }
  
    
    setSlide(i: number, userTriggered: boolean): void {
      this.activeSlide = (i + this.HERO_SLIDES) % this.HERO_SLIDES;
      this.updateHeroPosition();
      const dots = document.querySelectorAll('.hero-dot');
      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === this.activeSlide);
      });
      if (userTriggered) {
        this.restartHeroTimer();
      }
    }
  
    
    restartHeroTimer(): void {
      if (this.heroTimer) {
        clearInterval(this.heroTimer);
      }
      this.heroTimer = setInterval(() => this.setSlide(this.activeSlide + 1, false), 4500);
    }
  
    
    buildQuickActions(): void {
      const list = document.getElementById('quickActionsList');
      if (!list) return;
      list.innerHTML = '';
  
      this.quickActions.forEach((action) => {
        const li = document.createElement('li');
        li.className = 'qa-item';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'qa-btn';
        btn.setAttribute('aria-label', this.t('qa.' + action.key));
        btn.innerHTML = `
          <img src="${action.src}" alt="" />
          <span class="qa-label" data-key="${action.key}">${this.t('qa.' + action.key)}</span>
        `;
        btn.addEventListener('click', () => {
          console.log('Quick action clicked:', action.key);
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
    }
  
    buildTabs(): void {
      const list = document.getElementById('bottomTabs');
      if (!list) return;
      list.innerHTML = '';
  
      this.tabs.forEach((tab) => {
        const li = document.createElement('li');
        li.className = 'tab-item';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tab-btn' + (tab.key === this.activeTab ? ' active' : '');
        btn.setAttribute('aria-current', tab.key === this.activeTab ? 'page' : 'false');
        btn.dataset['tab'] = tab.key;
        btn.innerHTML = `
          <img src="${tab.src}" alt="" />
          <span class="tab-label" data-key="${tab.key}">${this.t('tabs.' + tab.key)}</span>
        `;
        btn.addEventListener('click', () => {
          this.activeTab = tab.key;
          this.updateTabs();
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
    }
  
    updateTabs(): void {
      const buttons = document.querySelectorAll('.tab-btn');
      buttons.forEach((b) => {
        const isActive = (b as HTMLElement).dataset['tab'] === this.activeTab;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-current', isActive ? 'page' : 'false');
      });
    }
  
    toggleLanguage(): void {
      this.lang = this.lang === 'ar' ? 'en' : 'ar';
      try {
        localStorage.setItem('ta_lang_ar', this.lang);
      } catch (e) {
      }
      this.applyDirAndLang();
      this.buildQuickActions();
      this.buildTabs();
      this.buildHero();
    }
  
   */
}