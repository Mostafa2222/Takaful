import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificationDTO } from "../../DTO/notification.dto";
import { AuthService } from "../../core/services/auth.service";
import { EnvironmentService } from "../environment.service";

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private http: HttpClient, public _environmentService: EnvironmentService,
      private authService: AuthService) { }
  
    public getAreas() {
      let url = this._environmentService.apiUrl + 'areas';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
        , 'Authorization': "Bearer " + this.authService.getToken()
      });
      return this.http.get<any[]>(url, { headers });
    }

    getNotifications() {
      return this.http.get<NotificationDTO[]>(this._environmentService.apiUrl + 'notifications', {
        headers: { Authorization: 'Bearer ' + this.authService.getToken() }
      });
    }

    markAsRead(id: string) {
      return this.http.patch(`${this._environmentService.apiUrl}notifications/${id}/read`, {}, {
        headers: { Authorization: 'Bearer ' + this.authService.getToken() }
      });
    }
}
