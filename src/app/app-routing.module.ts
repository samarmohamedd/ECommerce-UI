import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './Components/brands/brands.component';
import { BrandContainerComponent } from './Components/brands/brand-container/brand-container.component';
import { AddCategoryComponent } from './Components/category/add-category.component';
import { CategoryContainerComponent } from './Components/category/category-container/category-container.component';
import { CategoryComponent } from './Components/category/category.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductContainerComponent } from './Components/product/product-container/product-container.component';
import { ProductComponent } from './Components/product/product.component';
import { StockItemsComponent } from './Components/stock-items/stock-items.component';
import { StockItemsContainerComponent } from './Components/stock-items/stock-items-container/stock-items-container.component';
import { StockComponent } from './Components/stock/stock.component';
import { StockContainerComponent } from './Components/stock/stock-container/stock-container.component';
import { VendorComponent } from './Components/vendor/vendor.component';
import { VendorContainerComponent } from './Components/vendor/vendor-container/vendor-container.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'CategoryContainer', component: CategoryContainerComponent },
  { path: 'Category', component: CategoryComponent },
  { path: 'AddCategory', component: AddCategoryComponent },
  { path: 'BrandContainer', component: BrandContainerComponent },
  { path: 'Brand', component: BrandsComponent },
  { path: 'VendorContainer', component: VendorContainerComponent },
  { path: 'Vendor', component: VendorComponent },
  { path: 'StockContainer', component: StockContainerComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'ProductContainer', component: ProductContainerComponent },
  { path: 'StockItems', component: StockItemsComponent },
  { path: 'StockItemsContainer', component: StockItemsContainerComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
