import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import stockPriceData from 'src/assets/stock-price';

@Injectable()
export class MockStockPriceInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL matches the API endpoint you want to mock
    const match = req.url.match(/\/api\/stockprice\/(\d+)/);

    if (match && req.method === 'GET') {
      const code = match[1];
      // @ts-ignore
      const stockPriceItem = stockPriceData[code];

      if (stockPriceItem) {
        return of(new HttpResponse({ status: 200, body: stockPriceItem })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 404, body: { message: 'Stock price not found' } })).pipe(delay(500));
      }
    }

    // If the request URL doesn't match, pass it through to the next handler
    return next.handle(req);
  }
}
