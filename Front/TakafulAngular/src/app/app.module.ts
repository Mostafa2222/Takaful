import { APP_INITIALIZER, NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NotFoundComponent } from './components/RoutingComponents/not-found/not-found.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasteralertComponent } from './helper/toasteralert/toasteralert.component';
import { LoadingComponent } from './helper/loading/loading.component';
import { EnvironmentService } from './services/environment.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/RoutingComponents/login/login.component';
import { TreeModule } from 'primeng/tree';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { WebsiteLayoutComponent } from './Features/layouts/website-layout/website-layout.component';
// import { ContextMenuModule } from 'primeng/contextmenu';


export function HttpLoaderFactory(http: HttpClient) {
  //  return new TranslateHttpLoader(http, '/Front/Org/assets/i18n/', '.json');
 return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
export function initializeApp(configService: EnvironmentService) {
  return (): Promise<any> => {
    return configService.loadConfig().toPromise();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    ToasteralertComponent,
    LayoutComponent,
    LoadingComponent,
    WebsiteLayoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    TreeModule ,
    TranslateModule.forRoot(),
    RouterModule.forRoot([]),
    MatCardModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [CookieService,
    { provide: LocationStrategy
      , useClass: HashLocationStrategy
     },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [EnvironmentService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideToastr({ closeButton: true, positionClass: 'toast-top-right', preventDuplicates: true }),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  /* entryComponents: [
     ConfirmationDialogComponent,
     InputDialogComponent
   ]*/
})
export class AppModule { }
