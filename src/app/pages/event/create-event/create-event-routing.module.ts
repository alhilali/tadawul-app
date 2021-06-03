import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEventPage } from './create-event.page';

const routes: Routes = [
  {
    path: 'create',
    component: CreateEventPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEventPageRoutingModule {}
