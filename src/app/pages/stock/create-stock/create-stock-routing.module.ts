import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStockPage } from './create-stock.page';

const routes: Routes = [
  {
    path: 'create',
    component: CreateStockPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStockPageRoutingModule {}
