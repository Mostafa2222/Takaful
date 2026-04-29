import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/RoutingComponents/not-found/not-found.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { LoginComponent } from './components/RoutingComponents/login/login.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { WebsiteLayoutComponent } from './Features/layouts/website-layout/website-layout.component';

const routes: Routes = [

  //  WEBSITE (PUBLIC)
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Features/website/pages/components/website-content/website.content.module')
            .then(m => m.WebsiteContentModule)
      }
    ]
  },
  //  DASHBOARD (PROTECTED)
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
      }
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
export class AppRoutingModule { }
