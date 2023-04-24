import { Component, Input } from '@angular/core';
import { StockPriceService } from '../services/stock-price.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less']
})
export class ProductItemComponent {
  @Input() product: any;
  @Input() index!: number;
  price: number;
  // @ts-ignore
  private priceSubscription: Subscription;


  constructor(private stockPriceService: StockPriceService, private http: HttpClient) {
    this.price = 0;
  }

  ngOnInit() {
   // const baseUrl = window.location.protocol + '//' + window.location.host;
    const url = '/api/stockprice/' + this.product.skus[0].code;
    this.priceSubscription = interval(5000)
      .pipe(
        switchMap(() => this.http.get(url))
      )
    .subscribe((data: any) => {
      console.log(data);
      this.price = data.price;
    });
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
  }
}
