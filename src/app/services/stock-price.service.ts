// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import stockPrices from 'src/assets/stock-price';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  constructor() { } 

  getPrice(sku: any) {
    const skuString = sku.toString();
    return 1;
  }
}
