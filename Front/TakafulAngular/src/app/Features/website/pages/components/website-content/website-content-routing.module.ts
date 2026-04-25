import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  {path:"" , component:HomeComponent},
  {path:"dashboard" , component:DashboardComponent},
  // {path:"AdministrationPolicies" , component:AdministrationPoliciesComponent},
  // {path:"DepartmentDefinition" , component:DepartmentDefinitionComponent},
  // {path: 'treeOrgChart', component: TreeOrgChartComponent},
  // {path:"Financial" , component:FinancialComponent},
  // {path:"LocationDefinition" , component:LocationDefinitionComponent},
  // {path:"RelatedCompanies" , component:RelatedCompaniesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteContentRoutingModule { }
