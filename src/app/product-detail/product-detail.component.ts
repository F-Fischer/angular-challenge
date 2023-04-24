import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent {
  productId: any;
  productBrand: any;
  product: any;
  selectedSize: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {  
      let idAndBrand = params.get('productId-:productBrand')?.split('-');
      // @ts-ignore
      this.productId = idAndBrand[0];
      // @ts-ignore
      this.productBrand = idAndBrand[1];
      // @ts-ignore
      this.product = this.productService.getProductById(parseInt(idAndBrand[0]));
      console.log(this.product);
    });
  }
}
