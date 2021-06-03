import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DataStore } from '../shell/data-store';
import { StockListingModel } from './listing/stock-listing.model';
import { StockDetailsModel } from './details/stock-details.model';
import { TransferStateHelper } from '../../services/utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';
import { environment } from '../../../environments/environment';
import { of } from 'core-js/fn/array';
import { PageOptionsDto } from '../../models/dto/PageOptionsDto';

@Injectable()
export class StockService {
  private listingDataStore: DataStore<StockListingModel>;
  private detailsDataStore: DataStore<StockDetailsModel>;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private transferStateHelper: TransferStateHelper, private http: HttpClient) {}

  public getListingDataSource(): Observable<StockListingModel> {
    return this.http.get<StockListingModel>(environment.apiBaseUrl + '/stocks/my').pipe(
      map((data: StockListingModel) => {
        // Note: HttpClient cannot know how to instantiate a class for the returned data
        // We need to properly cast types from json data
        const listing = new StockListingModel();

        // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
        // Note: If you have non-enummerable properties, you can try a spread operator instead. listing = {...data};
        // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
        Object.assign(listing, { items: data });

        return listing;
      }),
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prstock
    // duplicate http requests.
    // const cachedDataSource = this.transferStateHelper.checkDataSourceState('stock-listing-state', rawDataSource);

    // return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<StockListingModel>): DataStore<StockListingModel> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: StockListingModel = new StockListingModel();
      this.listingDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
        // Trigger loading mechanism with 0 delay (this will prstock the shell to be shown)
        this.listingDataStore.load(dataSource, 0);
      } else {
        // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.listingDataStore.load(dataSource);
      }
    }
    return this.listingDataStore;
  }

  public getDetailsDataSource(id: string): Observable<StockDetailsModel | any> {
    const rawDataSource = this.http.get<StockDetailsModel>(environment.apiBaseUrl + '/stocks/' + id).pipe(
      map((data: StockDetailsModel) => {
        // Note: HttpClient cannot know how to instantiate a class for the returned data
        // We need to properly cast types from json data
        const details = new StockDetailsModel();

        // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
        // Note: If you have non-enummerable properties, you can try a spread operator instead. details = {...data};
        // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
        Object.assign(details, data);

        return details;
      }),
      catchError((error) => {
        console.log(error);
        return of({ error: error });
      }),
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prstock
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('stock-details-state' + id, rawDataSource);

    return cachedDataSource;
  }

  public getDetailsStore(dataSource: Observable<StockDetailsModel>): DataStore<StockDetailsModel> {
    // Use cache if available
    // Initialize the model specifying that it is a shell model
    const shellModel: StockDetailsModel = new StockDetailsModel();
    this.detailsDataStore = new DataStore(shellModel);

    // If running in the server, then don't add shell to the Data Store
    // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
    if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
      // Trigger loading mechanism with 0 delay (this will prstock the shell to be shown)
      this.detailsDataStore.load(dataSource, 0);
    } else {
      // On browser transitions
      // Trigger the loading mechanism (with shell)
      this.detailsDataStore.load(dataSource);
    }

    return this.detailsDataStore;
  }

  public getQuestions(stockID: string, pageOpts: PageOptionsDto = new PageOptionsDto()) {
    return this.http.get<any>(environment.apiBaseUrl + `/questions?order=${pageOpts.order}&page=${pageOpts.page}&take=${pageOpts.take}&stockID=${stockID}`);
  }

  public createStock(name: string, code: string, startDate: string, endDate: string) {
    return this.http.post<StockListingModel>(environment.apiBaseUrl + '/stocks', {
      name,
      code,
      startDate,
      endDate,
    });
  }

  public createPoll(id: string, question: string, options: string[]) {
    return this.http.post<StockListingModel>(environment.apiBaseUrl + `/stocks/${id}/polls`, {
      question,
      options,
      type: 'multiple',
    });
  }
}
