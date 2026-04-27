import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../helper/Services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private translate: TranslateService, private _alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        let message = '';

        if (error.status === 0) {
          message = this.translate.instant('messages.errors.server_down');
        } 
        else if (error.status === 401) {
          message = this.translate.instant('messages.errors.invalid_credentials');
        } 
        else if (error.status === 403) {
          message = this.translate.instant('messages.errors.forbidden');
        } 
        else if (error.status === 404) {
          message = this.translate.instant('messages.errors.not_found');
        } 
        else {
          message = this.translate.instant('messages.errors.unknown');
        }

        this._alertService.error(message);

        return throwError(() => error);
      })

    );
  }
}