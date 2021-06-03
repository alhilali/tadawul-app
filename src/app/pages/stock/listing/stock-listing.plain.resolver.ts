import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { StockService } from '../stock.service';
import { StockListingModel } from './stock-listing.model';

@Injectable()
export class StockListingPlainResolver implements Resolve<StockListingModel> {
  constructor(private stockService: StockService) {}

  resolve(): Observable<StockListingModel> {
    return this.stockService.getListingDataSource();
  }
}
