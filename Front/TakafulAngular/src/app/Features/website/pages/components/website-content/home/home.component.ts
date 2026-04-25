import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  currentSlide = signal(0);
  private timer: any;
  selectedCity = 'riyadh'; // Should be read from a global store/service in the future

  cities = [
    { id: "riyadh", name: "الرياض", image: "https://via.placeholder.com/150" },
    { id: "jeddah", name: "جدة", image: "https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKZWRkYWglMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3Njg0OTQ5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "dammam", name: "الدمام", image: "https://images.unsplash.com/photo-1672173466276-dde6fb871a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYW1tYW0lMjBTYXVkaSUyMGNpdHl8ZW58MXx8fHwxNzY4NDk0OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "makkah", name: "مكة المكرمة", image: "https://images.unsplash.com/photo-1707386929466-4958187026a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWtrYWglMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3Njg0OTQ5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080" }
  ];

  slides = [
    {
      image: "https://images.unsplash.com/photo-1576669801945-7a346954da5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjQ1Njg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "مرحباً بك في تطبيق تكافل",
      description: "خدمات التأمين الصحي الشاملة"
    },
    {
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "رعاية صحية متميزة",
      description: "تغطية شاملة لجميع احتياجاتك الطبية"
    },
    {
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "شبكة طبية واسعة",
      description: "أفضل المستشفيات والعيادات في خدمتك"
    },
    {
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "خدمات منزلية مميزة",
      description: "العلاج في راحة منزلك"
    }
  ];

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  setCurrentSlide(index: number) {
    this.currentSlide.set(index);
  }

  getSelectedCityImage(): string {
    return this.cities.find(c => c.id === this.selectedCity)?.image || this.cities[0].image;
  }

  onNavigate(route: string) {
    // Navigate to the respective route if it exists
    this.router.navigate(['/' + route]);
  }
}