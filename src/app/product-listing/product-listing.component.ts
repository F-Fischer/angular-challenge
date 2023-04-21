import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.less']
})
export class ProductListingComponent {
  products: any[];
  constructor(private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    console.log(this.products);
  }
}
