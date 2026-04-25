import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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

    this.load();
    this.error = null;
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        // localStorage.setItem('permissions', JSON.stringify(this.authService.getPermissions()));
        this.isLoading = false;
        
        this.router.navigate(['/content/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'البيانات المقدمة غير صحيحة' + err.message;
      }
    });
  }

  load(): void {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 3000);
  }
}
