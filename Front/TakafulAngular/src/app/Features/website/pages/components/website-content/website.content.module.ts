import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TableModule } from "primeng/table";
// import { TabViewModule } from 'primeng/tabview';
// import { KnobModule } from 'primeng/knob';
// import { SharedModule } from 'primeng/api';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { DropdownModule } from 'primeng/dropdown';
 import { WebsiteContentRoutingModule } from './website-content-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { ServiceIconComponent } from './helper/service-icon/service-icon.component';
import { LucideAngularModule, Home } from 'lucide-angular';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    // AddressSetupModelComponent,
    // AddressGroupModelComponent,
    // ShareholdersmodelComponent,
    // FiscalPeriodsComponent,
  
    HomeComponent,
    ServiceIconComponent
  ],
  imports: [
    LucideAngularModule.pick({ Home }),
     CommonModule,
     TreeModule ,
     WebsiteContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule,
    // SharedModule,
    // TableModule,
    // KnobModule,
    // FullCalendarModule,
    // TabViewModule,
    TranslateModule,
    ContextMenuModule,
    OrganizationChartModule,
    // DropdownModule,
    
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule
  ]
})
export class WebsiteContentModule { }
