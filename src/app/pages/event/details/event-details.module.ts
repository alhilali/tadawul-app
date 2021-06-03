import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../components/components.module';

import { EventService } from '../event.service';
import { EventDetailsPage } from './event-details.page';
import { EventDetailsResolver } from './event-details.resolver';
import { EventDetailsPlainResolver } from './event-details.plain.resolver';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../../environments/environment';
import { CreatePollPageModule } from '../../create-poll/create-poll.module';
const config: SocketIoConfig = { url: `${environment.socketIOBaseUrl}/questions`, options: {} };

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPage,
    resolve: {
      data: EventDetailsResolver,
      // data: EventDetailsPlainResolver
    },
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes), ComponentsModule, SocketIoModule.forRoot(config), CreatePollPageModule],
  declarations: [EventDetailsPage],
  providers: [EventDetailsResolver, EventDetailsPlainResolver, EventService],
})
export class EventDetailsPageModule {}
