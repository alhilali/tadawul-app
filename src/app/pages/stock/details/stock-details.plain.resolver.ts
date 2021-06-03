import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { StockService } from '../stock.service';
import { StockDetailsModel } from './stock-details.model';

@Injectable()
export class StockDetailsPlainResolver implements Resolve<StockDetailsModel> {
  constructor(private stockService: StockService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<StockDetailsModel> {
    const code = route.paramMap.get('code');
    return this.stockService.getDetailsDataSource(code);
  }
}
