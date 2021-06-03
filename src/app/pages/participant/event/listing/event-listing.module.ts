import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../../components/components.module';

import { EventService } from '../event.service';
import { EventListingPage } from './event-listing.page';
import { EventListingResolver } from './event-listing.resolver';
import { EventListingPlainResolver } from './event-listing.plain.resolver';

const routes: Routes = [
  {
    path: '',
    component: EventListingPage,
    resolve: {
      data: EventListingResolver,
      // data: EventListingPlainResolver
    },
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes), ComponentsModule],
  declarations: [EventListingPage],
  providers: [EventListingResolver, EventListingPlainResolver, EventService],
})
export class EventListingPageModule {}
