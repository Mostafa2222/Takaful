import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  showFooter:boolean = true;
  currentYear : number = (new Date()).getFullYear();
  constructor(public translate: TranslateService)
  {

  }
  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
