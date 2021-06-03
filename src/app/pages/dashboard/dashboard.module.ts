import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ComponentsModule } from '../../components/components.module';
import { CreateEventPageModule } from '../event/create-event/create-event.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, DashboardPageRoutingModule, CreateEventPageModule],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
