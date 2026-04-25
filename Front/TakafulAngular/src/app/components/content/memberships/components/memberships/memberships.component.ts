import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MembershipService } from '../../services/membership.service';
import { TranslateService } from '@ngx-translate/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from '../../../../../helper/Services/alert.service';
import { AuthService } from '../../../../../core/services/auth.service';
@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss'],
})
export class MembershipsComponent implements OnInit {
  memberships: any[] = [];
  durationTypes: string[] = [];

  showModal = false;
  canToggle = true;
  editing: any = null;

  loading = false;

  currentLang = 'ar';

  colorPresets = [
    '#6366f1', // Indigo
    '#3b82f6', // Blue
    '#22c55e', // Green
    '#eab308', // Yellow
    '#f97316', // Orange
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
  ];
  get dir() {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
  getName(m: any) {
    return this.currentLang === 'ar'
      ? m?.nameAr
      : (m?.nameEn || m?.nameAr);
  }
  get features(): FormArray<FormControl> {
    return this.form.get('features') as FormArray<FormControl>;
  }

  getDuration(m: any) {
    if (!m) return '';
  
    const type = this.translate.instant(
      'sidebar.memberships_page.memberships_modal.duration.' + m.durationType
    );
  
    return `${m.durationValue} ${type}`;
  }
  constructor(
    private fb: FormBuilder,
    private _membershipService: MembershipService,
    private translate: TranslateService, 
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const permissions =this._authService.getPermissions();// JSON.parse(localStorage.getItem('permissions') || '[]');
    this.canToggle = permissions.includes('MEMBERSHIP_UPDATE');
    this.currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'ar';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    this.load();
    this.loadDurationTypes();
  }

  load() {
    this.loading = true;

    this._membershipService.getAll().subscribe((res) => {
      this.memberships = res.content || res;
      this.loading = false;
    });
  }
  loadDurationTypes() {
    this._membershipService.getDurationTypes().subscribe((res) => {
      this.durationTypes = res;
    });
  }

  openModal() {
    this.showModal = true;
    this.editing = null;
    this.form.reset({
      color: '#4f46e5',
      isActive: true,
      durationType: 'YEAR',
      durationValue: 1,
      cardsCount: 1,
    });
    this.features.clear();
    this.addFeature();
  }

  generateGradient(color: string | null | any) {
    if (!color) return ['#6366f1', '#4f46e5'];

    return [color, this.shadeColor(color, -20)];
  }

  getContrastColor(bg: string | null | any) {
    if (!bg) return '#fff';

    const c = bg.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 140 ? '#111' : '#fff';
  }

  getGlow(color: string | null) {
    return color ? `${color}55` : '#6366f155';
  }

  shadeColor(color: string, percent: number) {
    const num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;

    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  getTextColor(bg: string | null) {
    if (!bg) return '#fff'; // fallback

    const c = bg.substring(1);

    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? '#000' : '#fff';
  }
  // =========================
  // ❌ CLOSE
  // =========================
  close() {
    this.showModal = false;
    this.editing = null;

    this.form.reset({
      nameAr: '',
      nameEn: '',
      price: 0,
      cardsCount: 1,
      durationType: 'YEAR',
      durationValue: 1,
      color: '#4f46e5',
      isActive: true,
    });

    this.features.clear();
  }

  // =========================
  // ✏️ EDIT
  // =========================
  edit(m: any) {
    this.showModal = true;
    this.editing = m;

    this.form.patchValue({
      nameAr: m.nameAr,
      nameEn: m.nameEn,
      price: m.price,
      cardsCount: m.cardsCount,
      durationType: m.durationType,
      durationValue: m.durationValue,
      color: m.color,
      isActive: m.isActive,
    });

    this.features.clear();

    m.features?.forEach((f: any) => {
      this.features.push(this.fb.control(f));
    });
  }

  // =========================
  // 🗑 DELETE
  // =========================
  async delete(m: any) {
    const confirmed = await AlertService.confirm('هل تريد حذف هذه العضوية؟');
    if (!confirmed) return;

    const oldList = [...this.memberships];

    this.memberships = this.memberships.filter((x) => x.id !== m.id);

    this._membershipService.delete(m.id).subscribe({
      next: () => {
        AlertService.toastSuccess('تم الحذف بنجاح');
      },
      error: () => {
        this.memberships = oldList;
        AlertService.error('فشل الحذف');
      },
    });
  }

  // =========================
  // 🔁 TOGGLE ACTIVE
  // =========================
  toggle(m: any) {
    if (!this.canToggle) {
      AlertService.error('ليس لديك صلاحية');
      return;
    }
  
    const old = m.isActive;
    m.isActive = !m.isActive;
  
    const payload = {
      ...m,
      isActive: m.isActive,
  
      // 🔥 أهم سطر
      features: (m.features || []).map((f: any) =>
        typeof f === 'string'
          ? { nameAr: f, nameEn: f }
          : f
      ),
    };
  
    this._membershipService.update(m.id, payload).subscribe({
      next: () => {
        AlertService.toastSuccess('تم تحديث الحالة');
      },
      error: () => {
        m.isActive = old;
        AlertService.error('فشل تحديث الحالة');
      },
    });
  }

  // =========================
  // 🧾 FORM
  // =========================
  form = this.fb.group({
    nameAr: ['', [Validators.required, Validators.minLength(3)]],
    nameEn: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    cardsCount: [1, [Validators.min(1)]],
    durationType: ['YEAR', Validators.required],
    durationValue: [1, [Validators.required, Validators.min(1)]],
    color: ['#4f46e5', Validators.required],
    isActive: [true],
    features: this.fb.array([]),
  });

  
  normalizeFeatures(features: any[]) {
    return (features || []).map(f =>
      typeof f === 'string'
        ? { nameAr: f, nameEn: f }
        : f
    );
  }
  isInvalid(controlName: string) {
    const c = this.form.get(controlName);
    return c?.invalid && (c.touched || c.dirty);
  }
  addFeature() {
    this.features.push(
      this.fb.control('', [Validators.required, Validators.minLength(2)])
    );
  }

  removeFeature(i: number) {
    this.features.removeAt(i);
  }

  buildPayload() {
    return {
      nameAr: this.form.value.nameAr,
      nameEn: this.form.value.nameEn,
      price: this.form.value.price,
      cardsCount: this.form.value.cardsCount,
      durationType: this.form.value.durationType,
      durationValue: this.form.value.durationValue,
      isActive: this.form.value.isActive,
      color: this.form.value.color,
      features: this.features.controls.map((f) => ({
        nameAr: f.value,
        nameEn: f.value,
      })),
    };
  }
  // =========================
  // 💾 SUBMIT
  // =========================
  submit() {
    if (this.editing) {
      this.updateMembership();
    } else {
      this.createMembership();
    }
  }
  createMembership() {
    const tempId = 'temp-' + Date.now();

    const newItem = {
      id: tempId,
      ...this.form.value,
      features: this.features.controls.map((f) => ({
        nameAr: f.value,
        nameEn: f.value,
      })),
      isActive: true,
    };

    this.memberships.unshift(newItem);

    this._membershipService.create(this.buildPayload()).subscribe({
      next: (res: any) => {
        const index = this.memberships.findIndex((x) => x.id === tempId);
        if (index !== -1) this.memberships[index] = res;
      },
      error: () => {
        this.memberships = this.memberships.filter((x) => x.id !== tempId);
      },
    });

    this.close();
  }

  updateMembership() {
    const id = this.editing.id;

    const index = this.memberships.findIndex((x) => x.id === id);
    const old = { ...this.memberships[index] };

    const updated = {
      ...old,
      ...this.form.value,
      features: this.features.controls.map((f) => f.value),
    };

    this.memberships[index] = updated;

    this._membershipService.update(id, this.buildPayload()).subscribe({
      next: (res: any) => {
        this.memberships[index] = res;

        AlertService.close();
        AlertService.toastSuccess('تم التعديل بنجاح');
      },
      error: () => {
        this.memberships[index] = old;
        AlertService.close();
        AlertService.error('فشل التعديل');
      },
    });

    this.close();
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.memberships, event.previousIndex, event.currentIndex);

    const orderedIds = this.memberships.map((m) => m.id);

    this._membershipService.reorder(orderedIds).subscribe();
  }
}
