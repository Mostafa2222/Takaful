import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateBookingRequest } from "../../DTO/CreateBookingRequest";
import { EnvironmentService } from "../environment.service";
import { AuthService } from "../../core/services/auth.service";

@Injectable({ providedIn: 'root' })
export class BookingService {

  constructor(private http: HttpClient, public _environmentService: EnvironmentService,
    private authService: AuthService) { }

  createBooking(req: CreateBookingRequest) {
    let url = this._environmentService.apiUrl + 'bookings';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': "Bearer " + this.authService.getToken()
    });
    return this.http.post(url, req, { headers });
  }

  cancelBooking(id: string) {
    let url = this._environmentService.apiUrl + `bookings/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': "Bearer " + this.authService.getToken()
    });
    return this.http.delete(url, { headers });
  }
}
