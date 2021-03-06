import { Component, ElementRef, ViewChild } from '@angular/core';

import { NavItem } from '../../../Interfaces/NavItem';
import { NavService } from 'src/app/Services/nav.service';
import { VERSION } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'root-nav',
  templateUrl: './root-nav.component.html',
  styleUrls: ['./root-nav.component.css']
})
export class RootNavComponent {
  @ViewChild('appDrawer') appDrawer: ElementRef | undefined;
  version = VERSION;


  navItems: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: '/Home',
      children: []
    },
    {
      displayName: 'Information',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Category',
          iconName: 'group',
          route: '/CategoryContainer',
          children: []
        },
        {
          displayName: 'Brand',
          iconName: 'group',
          route: '/BrandContainer',
          children: []
        }, {
          displayName: 'Product',
          iconName: 'group',
          route: '/ProductContainer',
          children: []
        },
      ]
    },
    {
      displayName: 'Stocks',
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Vendor',
          iconName: 'group',
          route: '/VendorContainer',
          children: []
        },
        {
          displayName: 'Stock',
          iconName: 'group',
          route: '/StockContainer',
          children: []
        }, {
          displayName: 'StockItems',
          iconName: 'group',
          route: '/StockItemsContainer',
          children: []
        },
      ]
    },


  ];


  constructor(private navService: NavService,
    public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
