import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { EnvironmentService } from "../../services/environment.service";

@Injectable({ providedIn: 'root' })
export class SidebarService {
  constructor(private http: HttpClient, public _environmentService: EnvironmentService,
    private authService: AuthService) { }

  getMenu() {
    return this.http.get<any[]>(this._environmentService.apiUrl + 'sidebar');
  }
}
