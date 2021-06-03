import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../../components/components.module';

import { StockService } from '../stock.service';
import { StockListingPage } from './stock-listing.page';
import { StockListingResolver } from './stock-listing.resolver';
import { StockListingPlainResolver } from './stock-listing.plain.resolver';
import { CreateStockPageModule } from '../create-stock/create-stock.module';

const routes: Routes = [
  {
    path: '',
    component: StockListingPage,
    resolve: {
      data: StockListingResolver,
      // data: StockListingPlainResolver
    },
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes), ComponentsModule, CreateStockPageModule],
  declarations: [StockListingPage],
  providers: [StockListingResolver, StockListingPlainResolver, StockService],
})
export class StockListingPageModule {}
