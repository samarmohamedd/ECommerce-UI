import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicService } from './public-service.service';
import { Observable } from 'rxjs';


import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { CategoryComponent } from './Components/category/category.component';
import { AddCategoryComponent } from './Components/category/add-category.component';
import { SideNavBarComponent } from './Components/side-nav-bar/side-nav-bar.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VendorComponent } from './Components/vendor/vendor.component';
import { StockComponent } from './Components/stock/stock.component';
import { ProductComponent } from './Components/product/product.component';
import { StockItemsComponent } from './Components/stock-items/stock-items.component';
var router = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Category', component: CategoryComponent },
  { path: 'AddCategory', component: AddCategoryComponent },
  { path: 'Brand', component: BrandsComponent },
  { path: 'Vendor', component: VendorComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'StockItems', component: StockItemsComponent },


])
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    BsNavbarComponent,
    HomeComponent,
    AddCategoryComponent,
    SideNavBarComponent,
    BrandsComponent,
    VendorComponent,
    StockComponent,
    ProductComponent,
    StockItemsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    AppRoutingModule,
    router,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  providers: [PublicService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faFilm);
  }
}
