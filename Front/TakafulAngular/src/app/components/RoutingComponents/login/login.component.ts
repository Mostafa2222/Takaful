import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../helper/Services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;
  phone = '';
  username = '';
  password = '';
  error: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _alertService: AlertService,
    private translate: TranslateService
  ) {
  }
  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      this.router.navigate(['/Login']);
    }
    else {
      //this.router.navigate([`/Content/LegalStatus`]);
    }
  }

  login() {

    this._alertService.loading(
      this.translate.instant('messages.auth.login.loading')
    );

    this.authService.login(this.username, this.password).subscribe({

      next: (res: any) => {
        this._alertService.close();

        this.authService.saveToken(res.token);

        this._alertService.success(
          this.translate.instant('messages.auth.login.success')
        );

        this.router.navigate(['/content/']);
      },
      error: (err) => {
        this._alertService.close();

        this._alertService.error(this.handleError(err));
      }
    });
  }

  handleError(err: any): string {

    if (err.status === 0) {
      return this.translate.instant('messages.errors.server_down');
    }

    if (err.status === 401) {
      return this.translate.instant('messages.errors.invalid_credentials');
    }

    return this.translate.instant('messages.errors.unknown');
  }
}
