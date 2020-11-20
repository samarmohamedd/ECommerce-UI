import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './Components/category/category.component';
import { PublicServiceService } from './public-service.service';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PublicServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
