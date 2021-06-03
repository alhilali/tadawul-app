import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { EventService } from '../event.service';
import { EventDetailsModel } from './event-details.model';

@Injectable()
export class EventDetailsPlainResolver implements Resolve<EventDetailsModel> {
  constructor(private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EventDetailsModel> {
    const code = route.paramMap.get('code');
    return this.eventService.getDetailsDataSource(code);
  }
}
