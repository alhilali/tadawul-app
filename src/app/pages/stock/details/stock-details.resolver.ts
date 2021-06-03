import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { StockService } from '../stock.service';
import { StockDetailsModel } from './stock-details.model';
import { map } from 'rxjs/operators';
import { SeoDataModel } from '../../../services/utils/seo/seo-data.model';

@Injectable()
export class StockDetailsResolver implements Resolve<any> {
  constructor(private stockService: StockService) {}

  resolve(route: ActivatedRouteSnapshot): { dataStore: DataStore<StockDetailsModel>; seo: Observable<SeoDataModel> } {
    const id = route.paramMap.get('id');
    const dataSource: Observable<StockDetailsModel> = this.stockService.getDetailsDataSource(id);

    // Typically, SEO titles, descriptions, etc depend on the data being resolved for a specific route
    const seoObservable: Observable<SeoDataModel> = dataSource.pipe(
      map((data) => {
        const seo = new SeoDataModel();
        seo.title = data.company;
        // seo.description = data.fullDescription;
        // seo.keywords = data.category;
        return seo;
      }),
    );

    const dataStore: DataStore<StockDetailsModel> = this.stockService.getDetailsStore(dataSource);

    return { dataStore: dataStore, seo: seoObservable };
  }
}
