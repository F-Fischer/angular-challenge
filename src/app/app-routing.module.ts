import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { 
    path: '',
    component: ProductListingComponent,
    data: { headingText: '' }
  },
  {
    path: ':productId-:productBrand',
    component: ProductDetailComponent,
    data: { headingText: 'Details' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
