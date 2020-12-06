import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
*Material Modules
 */
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

/**
 * Components
 * */
import { PublicService } from './Services/Public.Service/public-service.service';
import { NavService } from './Services/nav.service';
import { ToasterService } from './Services/Toaster.Service/toaster.service';
import { HomeComponent } from './Components/home/home.component';
import { CategoryComponent } from './Components/category/category.component';
import { AddCategoryComponent } from './Components/category/add-category.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { VendorComponent } from './Components/vendor/vendor.component';
import { StockComponent } from './Components/stock/stock.component';
import { ProductComponent } from './Components/product/product.component';
import { StockItemsComponent } from './Components/stock-items/stock-items.component';
import { RootNavComponent } from './Components/Menu/root-nav/root-nav.component';
import { MenuListItemComponent } from './Components/Menu/root-nav/menu-list-item.component';

import { LayoutModule } from '@angular/cdk/layout';
import { ToolBarComponent } from './Components/Menu/tool-bar/tool-bar.component';
import { CategoryContainerComponent } from './Components/category/category-container/category-container.component';
import { BrandContainerComponent } from './Components/brands/brand-container/brand-container.component';
import { ProductContainerComponent } from './Components/product/product-container/product-container.component';
import { VendorContainerComponent } from './Components/vendor/vendor-container/vendor-container.component';
import { StockContainerComponent } from './Components/stock/stock-container/stock-container.component';
import { StockItemsContainerComponent } from './Components/stock-items/stock-items-container/stock-items-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HomeComponent,
    AddCategoryComponent,
    BrandsComponent,
    VendorComponent,
    StockComponent,
    ProductComponent,
    StockItemsComponent,
    RootNavComponent,
    ToolBarComponent,
    MenuListItemComponent,
    CategoryContainerComponent,
    BrandContainerComponent,
    ProductContainerComponent,
    VendorContainerComponent,
    StockContainerComponent,
    StockItemsContainerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [PublicService, NavService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(faFilm);
  }
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}