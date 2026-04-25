import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { LocationService } from '../../../services/Common-Services/location.service';
import { FormControl } from '@angular/forms';
import { Location2Service } from '../../../services/Common-Services/location2service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent {

  searchControl = new FormControl('');
  results: any[] = [];
  cities: any[] = [];
  districts: any[] = [];
  highlightIndex = -1;
  loading = false;
  selectedItem: any = null;

  districtSearch = '';
  filteredDistricts: any[] = [];

  constructor(private locationService: Location2Service) { }

  ngOnInit(): void {

    // 🔥 load json مرة واحدة بس
    this.locationService.loadData().subscribe(() => {

      this.searchControl.valueChanges.pipe(

        debounceTime(300),

        distinctUntilChanged(),

        tap(() => {
          this.loading = true;
          this.highlightIndex = -1;
        }),

        map(value => value || ''),

        map(value => this.locationService.search(value))

      ).subscribe(res => {
        this.results = res;
        this.loading = false;
      });

    });
  }


  // =========================
  // 🎯 SELECT
  // =========================
  selectItem(item: any) {

    this.selectedItem = item;
    this.searchControl.setValue(
      item.name_ar || item.name_en,
      { emitEvent: false }
    );

    this.results = [];

    this.loadChildren(item);
  }
  // =========================
  // 📍 LOAD CHILDREN
  // =========================
  loadChildren(item: any) {

    this.cities = [];
    this.districts = [];
    this.filteredDistricts = [];
    this.districtSearch = '';
  
    if (item.type === 'REGION') {
  
      this.cities = this.locationService.getCitiesByRegion(item.region_id);
  
    } else if (item.type === 'CITY') {
  
      this.districts = this.locationService
        .getDistrictsByCity(item.city_id)
        .slice(0, 100);
  
      this.filteredDistricts = this.districts;
    }
  }
  // =========================
  // ⌨️ KEYBOARD NAVIGATION
  // =========================
  onKeyDown(event: KeyboardEvent) {

    if (!this.results.length) return;

    if (event.key === 'ArrowDown') {
      this.highlightIndex =
        (this.highlightIndex + 1) % this.results.length;
      this.scrollToItem();
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      this.highlightIndex =
        (this.highlightIndex - 1 + this.results.length) % this.results.length;
      this.scrollToItem();
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      if (this.highlightIndex >= 0) {
        this.selectItem(this.results[this.highlightIndex]);
      }
    }
  }

  // =========================
  // 🔥 SCROLL WITH KEYBOARD
  // =========================
  scrollToItem() {
    setTimeout(() => {
      const el = document.querySelector('.item.active');
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // =========================
  // ✨ TEXT HIGHLIGHT
  // =========================
  highlight(text: string): string {

    const query = this.searchControl.value;

    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');

    return text.replace(regex, `<b>$1</b>`);
  }

  filterDistricts() {

    const q = this.districtSearch.toLowerCase();

    this.filteredDistricts = this.districts.filter(d =>
      (d.name_ar && d.name_ar.includes(this.districtSearch)) ||
      (d.name_en && d.name_en.toLowerCase().includes(q))
    );
  }
  // searchControl = new FormControl('');
  // results: any[] = [];
  // loading: boolean =false;
  // constructor(private locationService: LocationService) {}

  // ngOnInit() {
  //   this.searchControl.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap(value => {
  //       console.log("INPUT:", value); 
  //       return this.locationService.search(value || '');
  //     })
  //   ).subscribe(res => {
  //     console.log("API RESULT:", res); 
  //     this.results = res || [];
  //   });
  // }
}
