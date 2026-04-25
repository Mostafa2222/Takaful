import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingWizardComponent } from './booking/booking-wizard.component';
import { MapComponent } from './map/map.component';
import { RolesPermissionsComponent } from './roles-permissions/roles-permissions.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { LocationSelectorComponent } from './location/components/location-selector/location-selector.component';
import { MembershipsComponent } from './memberships/components/memberships/memberships.component';

const routes: Routes = [
  // {path:"" , component:LegalStatusComponent},
  { path: 'map', component: MapComponent },
  { path: 'booking', component: BookingWizardComponent },
  {
    path: 'roles',
    component: RolesPermissionsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'VIEW_ROLES' },
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'VIEW_USERS' }
  },
  {
    path: 'locations',
    component: LocationSelectorComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'MANAGE_LOCATIONS' },
  },
  {
    path: 'cards',
    component: MembershipsComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'MEMBERSHIP_VIEW' },
  }
  // {path:"AdministrationPolicies" , component:AdministrationPoliciesComponent},
  // {path:"DepartmentDefinition" , component:DepartmentDefinitionComponent},
  // {path: 'treeOrgChart', component: TreeOrgChartComponent},
  // {path:"Financial" , component:FinancialComponent},
  // {path:"LocationDefinition" , component:LocationDefinitionComponent},
  // {path:"RelatedCompanies" , component:RelatedCompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
