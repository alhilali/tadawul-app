import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { EventService } from '../event.service';
import { EventListingModel } from './event-listing.model';

@Injectable()
export class EventListingPlainResolver implements Resolve<EventListingModel> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<EventListingModel> {
    return this.eventService.getListingDataSource();
  }
}
