import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class Location2Service {

  private cities: any[] = [];
  private regions: any[] = [];
  private districts: any[] = [];

  private loaded = false;

  constructor(private http: HttpClient) {}

  loadData(): Observable<boolean> {
    if (this.loaded) return of(true); 
    return forkJoin({
      cities: this.http.get<any[]>('assets/locations/cities.json'),
      regions: this.http.get<any[]>('assets/locations/regions.json'),
      districts: this.http.get<any[]>('assets/locations/districts.json')
    }).pipe(
      tap(res => {
        this.cities = res.cities;
        this.regions = res.regions;
        this.districts = res.districts;
        this.loaded = true;
      }),
      map(() => true) // 🔹 مهم: نرجع boolean عشان يكون من نفس النوع
    );
  }

  search(query: string): any[] {
    if (!query) return [];

    const q = query.toLowerCase();

    const cities = this.cities
      .filter(c =>
        c.name_en?.toLowerCase().includes(q) ||
        c.name_ar?.includes(query)
      )
      .map(c => ({ ...c, type: 'CITY' }));

    const regions = this.regions
      .filter(r =>
        r.name_en?.toLowerCase().includes(q) ||
        r.name_ar?.includes(query)
      )
      .map(r => ({ ...r, type: 'REGION' }));

    return [...cities, ...regions].slice(0, 20);
  }

  getCitiesByRegion(regionId: number) {
    return this.cities.filter(c => c.region_id === regionId);
  }
  
  getDistrictsByCity(cityId: number) {
    return this.districts.filter(d => d.city_id === cityId);
  }
}