import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/RoutingComponents/not-found/not-found.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { LoginComponent } from './components/RoutingComponents/login/login.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'Content/LegalStatus', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'content',
        loadChildren: () =>
          import('./components/content/content.module').then(
            (m) => m.ContentModule
          ),
      },
      {
        path: 'website',
        loadChildren: () =>
          import(
            './Features/website/pages/components/website-content/website.content.module'
          ).then((m) => m.WebsiteContentModule),
      },
    ],
  },
  { path: 'Login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
