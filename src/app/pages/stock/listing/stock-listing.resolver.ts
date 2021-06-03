import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { StockService } from '../stock.service';
import { StockListingModel } from './stock-listing.model';
import { SeoDataModel } from '../../../services/utils/seo/seo-data.model';

@Injectable()
export class StockListingResolver implements Resolve<any> {
  constructor(private stockService: StockService) {}

  resolve(): { dataStore: DataStore<StockListingModel>; seo: Observable<SeoDataModel> } {
    const dataSource: Observable<StockListingModel> = this.stockService.getListingDataSource();
    const dataStore: DataStore<StockListingModel> = this.stockService.getListingStore(dataSource);

    const seo = new SeoDataModel();
    seo.title = 'Stocks';
    // seo.description = 'Stock Description';
    // seo.keywords = 'stock, keywords, ionic, angular';

    return { dataStore: dataStore, seo: of(seo) };
  }
}
