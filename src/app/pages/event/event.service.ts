import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DataStore } from '../shell/data-store';
import { EventListingModel } from './listing/event-listing.model';
import { EventDetailsModel } from './details/event-details.model';
import { TransferStateHelper } from '../../services/utils/transfer-state-helper';
import { isPlatformServer } from '@angular/common';
import { environment } from '../../../environments/environment';
import { of } from 'core-js/fn/array';
import { PageOptionsDto } from '../../models/dto/PageOptionsDto';

@Injectable()
export class EventService {
  private listingDataStore: DataStore<EventListingModel>;
  private detailsDataStore: DataStore<EventDetailsModel>;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private transferStateHelper: TransferStateHelper, private http: HttpClient) {}

  public getListingDataSource(): Observable<EventListingModel> {
    return this.http.get<EventListingModel>(environment.apiBaseUrl + '/events/my').pipe(
      map((data: EventListingModel) => {
        // Note: HttpClient cannot know how to instantiate a class for the returned data
        // We need to properly cast types from json data
        const listing = new EventListingModel();

        // The Object.assign() method copies all enumerable own properties from one or more source objects to a target object.
        // Note: If you have non-enummerable properties, you can try a spread operator instead. listing = {...data};
        // (see: https://scotch.io/bar-talk/copying-objects-in-javascript#toc-using-spread-elements-)
        Object.assign(listing, { items: data });

        return listing;
      }),
    );

    // This method tapps into the raw data source and stores the resolved data in the TransferState, then when
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    // const cachedDataSource = this.transferStateHelper.checkDataSourceState('event-listing-state', rawDataSource);

    // return cachedDataSource;
  }

  public getListingStore(dataSource: Observable<EventListingModel>): DataStore<EventListingModel> {
    // Use cache if available
    if (!this.listingDataStore) {
      // Initialize the model specifying that it is a shell model
      const shellModel: EventListingModel = new EventListingModel();
      this.listingDataStore = new DataStore(shellModel);

      // If running in the server, then don't add shell to the Data Store
      // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
      if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
        // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
        this.listingDataStore.load(dataSource, 0);
      } else {
        // On browser transitions
        // Trigger the loading mechanism (with shell)
        this.listingDataStore.load(dataSource);
      }
    }
    return this.listingDataStore;
  }

  public getDetailsDataSource(id: string): Observable<EventDetailsModel | any> {
    const rawDataSource = this.http.get<EventDetailsModel>(environment.apiBaseUrl + '/events/' + id).pipe(
      map((data: EventDetailsModel) => {
        // Note: HttpClient cannot know how to instantiate a class for the returned data
        // We need to properly cast types from json data
        const details = new EventDetailsModel();

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
    // transitioning from the server rendered view to the browser, checks if we already loaded the data in the server to prevent
    // duplicate http requests.
    const cachedDataSource = this.transferStateHelper.checkDataSourceState('event-details-state' + id, rawDataSource);

    return cachedDataSource;
  }

  public getDetailsStore(dataSource: Observable<EventDetailsModel>): DataStore<EventDetailsModel> {
    // Use cache if available
    // Initialize the model specifying that it is a shell model
    const shellModel: EventDetailsModel = new EventDetailsModel();
    this.detailsDataStore = new DataStore(shellModel);

    // If running in the server, then don't add shell to the Data Store
    // If we already loaded the Data Source in the server, then don't show a shell when transitioning back to the broswer from the server
    if (isPlatformServer(this.platformId) || dataSource['ssr_state']) {
      // Trigger loading mechanism with 0 delay (this will prevent the shell to be shown)
      this.detailsDataStore.load(dataSource, 0);
    } else {
      // On browser transitions
      // Trigger the loading mechanism (with shell)
      this.detailsDataStore.load(dataSource);
    }

    return this.detailsDataStore;
  }

  public getQuestions(eventID: string, pageOpts: PageOptionsDto = new PageOptionsDto()) {
    return this.http.get<any>(environment.apiBaseUrl + `/questions?order=${pageOpts.order}&page=${pageOpts.page}&take=${pageOpts.take}&eventID=${eventID}`);
  }

  public createEvent(name: string, code: string, startDate: string, endDate: string) {
    return this.http.post<EventListingModel>(environment.apiBaseUrl + '/events', {
      name,
      code,
      startDate,
      endDate,
    });
  }

  public createPoll(id: string, question: string, options: string[]) {
    return this.http.post<EventListingModel>(environment.apiBaseUrl + `/events/${id}/polls`, {
      question,
      options,
      type: 'multiple',
    });
  }
}
