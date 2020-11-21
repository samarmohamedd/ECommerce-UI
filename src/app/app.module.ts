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

import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicService } from './public-service.service';
import { Observable } from 'rxjs';

import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { CategoryComponent } from './Components/category/category.component';
import { AddCategoryComponent } from './Components/category/add-category.component';
var router = RouterModule.forRoot([
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Category', component: CategoryComponent },
  { path: 'AddCategory', component: AddCategoryComponent },


])
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    BsNavbarComponent,
    HomeComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    router,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [PublicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
