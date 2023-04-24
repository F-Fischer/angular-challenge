import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Subscription, BehaviorSubject, switchMap, startWith } from 'rxjs';
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
  private selectedSkuSubject: BehaviorSubject<any>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient) {
      this.selectedSkuSubject = new BehaviorSubject<any>(null);
  }

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

      this.priceSubscription = this.selectedSkuSubject
        .pipe(
          startWith(null),
          switchMap((sku) => {
            if (sku) {
              const url = '/api/stockprice/' + sku.code;
              return this.http.get(url);
            }
            this.selectedSku = this.product.skus[0];
            return this.http.get('/api/stockprice/' + this.selectedSku.code);
          })
        )
        .subscribe((data: any) => {
          console.log(data);
          this.price = data.price;
          this.stock = data.stock;
        });
    });
  }

  onSkuClick(sku: any) {
    this.selectedSku = sku;
    this.selectedSkuSubject.next(sku);
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
