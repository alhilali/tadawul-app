import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ComponentsModule } from '../../components/components.module';
import { CreateStockPageModule } from '../stock/create-stock/create-stock.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, DashboardPageRoutingModule, CreateStockPageModule],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
