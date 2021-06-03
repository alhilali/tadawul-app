import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../components/components.module';

import { StockService } from '../stock.service';
import { StockDetailsPage } from './stock-details.page';
import { StockDetailsResolver } from './stock-details.resolver';
import { StockDetailsPlainResolver } from './stock-details.plain.resolver';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import { environment } from '../../../../environments/environment';
import { CreatePollPageModule } from '../../create-poll/create-poll.module';
// const config: SocketIoConfig = { url: `${environment.socketIOBaseUrl}/questions`, options: {} };

const routes: Routes = [
  {
    path: '',
    component: StockDetailsPage,
    resolve: {
      data: StockDetailsResolver,
      // data: StockDetailsPlainResolver
    },
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes), ComponentsModule, CreatePollPageModule],
  declarations: [StockDetailsPage],
  providers: [StockDetailsResolver, StockDetailsPlainResolver, StockService],
})
export class StockDetailsPageModule {}
