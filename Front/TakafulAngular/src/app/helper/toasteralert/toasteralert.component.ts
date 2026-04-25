import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-toasteralert',
  templateUrl: './toasteralert.component.html',
  styleUrl: './toasteralert.component.css'
})
export class ToasteralertComponent {

  constructor(private toaster:ToastrService){

  }

  showSuccess(){
    this.toaster.info('Logged Successfully','success', {closeButton:true,positionClass:'toast-top-right'})
  }
}
