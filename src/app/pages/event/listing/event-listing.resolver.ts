import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { EventService } from '../event.service';
import { EventListingModel } from './event-listing.model';
import { SeoDataModel } from '../../../services/utils/seo/seo-data.model';

@Injectable()
export class EventListingResolver implements Resolve<any> {
  constructor(private eventService: EventService) {}

  resolve(): { dataStore: DataStore<EventListingModel>; seo: Observable<SeoDataModel> } {
    const dataSource: Observable<EventListingModel> = this.eventService.getListingDataSource();
    const dataStore: DataStore<EventListingModel> = this.eventService.getListingStore(dataSource);

    const seo = new SeoDataModel();
    seo.title = 'Events';
    // seo.description = 'Event Description';
    // seo.keywords = 'event, keywords, ionic, angular';

    return { dataStore: dataStore, seo: of(seo) };
  }
}
