// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import products from 'src/assets/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    return products;
  }

  getProductById(id: number) {
    return products.find(product => product.id === id);
  }
}
