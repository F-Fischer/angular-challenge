import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription, interval, switchMap, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent {
  productId: any;
  productBrand: any;
  price: any;
  stock: any;
  product: any;
  selectedSku: any;
  private priceSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient) { }

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

      const url = '/api/stockprice/' + this.product.skus[0].code;
      this.priceSubscription = interval(5000)
      .pipe(
          startWith(0),
          switchMap(() => this.http.get(url))
        )
      .subscribe((data: any) => {
        console.log(data);
        this.price = data.price;
        this.stock = data.stock;
      });
    });
  }

  onSkuClick(sku: any) {
    console.log(sku);
  }

  addToCart() {
    console.log('addToCart');
  }

  onShopingBagButton() {
    console.log('onShopingBagButton');
  }

  ngOnDestroy() {
    this.priceSubscription?.unsubscribe();
  }


}
