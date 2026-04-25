import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Slot } from "../../DTO/Slot";
import { EnvironmentService } from "../environment.service";
import { AuthService } from "../../core/services/auth.service";

@Injectable({ providedIn: 'root' })
export class SlotService {
  constructor(private http: HttpClient, public _environmentService: EnvironmentService,
        private authService: AuthService) { }

      
  getSlots(start: string, end: string, areaId: string) {
    return this.http.get<Slot[]>(
      `${this._environmentService.apiUrl}slots/calendar?start=${start}&end=${end}&areaId=${areaId}`,
      { headers: { Authorization: 'Bearer ' + this.authService.getToken() } }
    );
  }
}
