import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public hasNav = true;
  public hasSidebar = true;
  public hasFooter = true;
  public showLayoutFlag = true;
  public excludeLayout = false; // Track when to hide layout elements

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide layout for 'treeOrgChart' route
        this.excludeLayout = event.url.includes('treeOrgChart');
      }
    });
  }
}
