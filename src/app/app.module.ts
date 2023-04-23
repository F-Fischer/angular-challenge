import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from './shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockStockPriceInterceptor } from './interceptors/mock-stock-price.interceptor';
import { CategoryFilterComponent } from './product-listing/category-filter/category-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListingComponent,
    ProductDetailComponent,
    ProductItemComponent,
    CategoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockStockPriceInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
