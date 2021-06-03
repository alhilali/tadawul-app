import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStore } from '../../shell/data-store';
import { EventService } from '../event.service';
import { EventDetailsModel } from './event-details.model';
import { map } from 'rxjs/operators';
import { SeoDataModel } from '../../../services/utils/seo/seo-data.model';

@Injectable()
export class EventDetailsResolver implements Resolve<any> {
  constructor(private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot): { dataStore: DataStore<EventDetailsModel>; seo: Observable<SeoDataModel> } {
    const id = route.paramMap.get('id');
    const dataSource: Observable<EventDetailsModel> = this.eventService.getDetailsDataSource(id);

    // Typically, SEO titles, descriptions, etc depend on the data being resolved for a specific route
    const seoObservable: Observable<SeoDataModel> = dataSource.pipe(
      map((data) => {
        const seo = new SeoDataModel();
        seo.title = data.name;
        // seo.description = data.fullDescription;
        // seo.keywords = data.category;
        return seo;
      }),
    );

    const dataStore: DataStore<EventDetailsModel> = this.eventService.getDetailsStore(dataSource);

    return { dataStore: dataStore, seo: seoObservable };
  }
}
