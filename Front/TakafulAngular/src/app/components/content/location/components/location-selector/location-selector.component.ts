import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
  levels: any[][] = [];
  selected: any[] = [];
  searchTerms: string[] = [];

  selectedCountry: any;
  selectedRegion: any;
  selectedCity: any;
  selectedDistrict: any;
  search = '';
  results: any[] = [];
  loading = false;

  showModal = false;
  currentLevel = 0;
  currentType: string = '';
  parentId: string | null = null;
  currentLang = this.translate.currentLang || 'ar';

  form: any = {
    nameAr: '',
    nameEn: '',
    code: ''
  };

  getName(item: any) {
    return this.currentLang === 'ar' ? item.nameAr : item.nameEn;
  }

  get nameField() {
    return this.currentLang === 'ar' ? 'nameAr' : 'nameEn';
  }

  getType(level: number) {
    return ['COUNTRY', 'REGION', 'CITY', 'DISTRICT'][level];
  }
  constructor(
    private locationService: LocationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang || 'ar';

    this.translate.onLangChange.subscribe((res) => {
      this.currentLang = res.lang;
    });

    this.loadCountries();
  }

  loadCountries() {
    this.locationService.getCountries().subscribe((res) => {
      this.levels[0] = res;
      this.searchTerms[0] = '';
    });
  }

  selectItem(item: any, levelIndex: number) {
    this.selected[levelIndex] = item;

    // reset اللي بعده
    this.levels = this.levels.slice(0, levelIndex + 1);
    this.selected = this.selected.slice(0, levelIndex + 1);
    this.searchTerms = this.searchTerms.slice(0, levelIndex + 1);

    this.locationService.getChildren(item.id).subscribe((res) => {
      if (res && res.length) {
        this.levels[levelIndex + 1] = res;
        this.searchTerms[levelIndex + 1] = '';
      }
    });
  }

  filter(list: any[], term: string) {
    if (!term) return list;

    const q = term.toLowerCase();

    return list.filter(
      (x) => x.nameAr?.includes(term) || x.nameEn?.toLowerCase().includes(q)
    );
  }

  getLevelName(i: number) {
    const namesAr = ['الدولة', 'المنطقة', 'المدينة', 'الحي'];
    const namesEn = ['Country', 'Region', 'City', 'District'];

    return this.currentLang === 'ar'
      ? namesAr[i] || 'Level'
      : namesEn[i] || 'Level';
  }

  openAddModal(level: number) {

    this.currentLevel = level;
    this.currentType = this.getType(level);
  
    this.parentId = this.selected[level - 1]?.id || null;
  
    this.form = {
      nameAr: '',
      nameEn: '',
      code: ''
    };
  
    this.showModal = true;
  }

  submit() {

    const payload = {
      nameAr: this.form.nameAr,
      nameEn: this.form.nameEn,
      code: this.currentType === 'COUNTRY' ? this.form.code : null,
      type: this.currentType,
      parentId: this.parentId,
      lat: null,
      lng: null
    };
  
    this.locationService.create(payload).subscribe((res: any) => {
  
      if (!this.levels[this.currentLevel]) {
        this.levels[this.currentLevel] = [];
      }
  
      this.levels[this.currentLevel].push(res);
  
      this.selectItem(res, this.currentLevel);
  
      this.showModal = false;
  
    });
  }

  // onCountryChange(country: any) {

  //   this.selectedCountry = country;

  //   this.selectedRegion = null;
  //   this.selectedCity = null;
  //   this.selectedDistrict = null;

  //   this.regions = [];
  //   this.cities = [];
  //   this.districts = [];

  //   this.loading = true;

  //   this.locationService.getChildren(country.id)
  //     .subscribe(res => {
  //       this.regions = res;
  //       this.loading = false;
  //     });
  // }

  // onSearch() {

  //   if (!this.search) {
  //     this.results = [];
  //     return;
  //   }

  //   this.loading = true;

  //   this.locationService.search(this.search)
  //     .subscribe(res => {
  //       this.results = res;
  //       this.loading = false;
  //     });
  // }

  // select(item: any) {

  //   this.results = [];
  //   this.search = item.nameAr;

  //   this.locationService.getChildren(item);
  // }

  // getIcon(type: string) {

  //   switch (type) {
  //     case 'REGION': return 'fa fa-map-marker';
  //     case 'CITY': return 'fa fa-city';
  //     case 'DISTRICT': return 'fa fa-location-dot';
  //     default: return '';
  //   }
  // }
}
