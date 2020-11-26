import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsComponent } from './Components/brands/brands.component';
import { AddCategoryComponent } from './Components/category/add-category.component';
import { CategoryComponent } from './Components/category/category.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { StockItemsComponent } from './Components/stock-items/stock-items.component';
import { StockComponent } from './Components/stock/stock.component';
import { VendorComponent } from './Components/vendor/vendor.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Category', component: CategoryComponent },
  { path: 'AddCategory', component: AddCategoryComponent },
  { path: 'Brand', component: BrandsComponent },
  { path: 'Vendor', component: VendorComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'StockItems', component: StockItemsComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
