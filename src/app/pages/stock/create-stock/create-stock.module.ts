import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStockPageRoutingModule } from './create-stock-routing.module';

import { CreateStockPage } from './create-stock.page';
import { ComponentsModule } from '../../../components/components.module';
import { StockService } from '../stock.service';

@NgModule({
  imports: [ComponentsModule, CommonModule, FormsModule, ReactiveFormsModule, IonicModule, CreateStockPageRoutingModule],
  declarations: [CreateStockPage],
  providers: [StockService],
})
export class CreateStockPageModule {}
