import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePollPageRoutingModule } from './create-poll-routing.module';

import { CreatePollPage } from './create-poll.page';
import { ComponentsModule } from '../../components/components.module';
import { StockService } from '../stock/stock.service';

@NgModule({
  imports: [ComponentsModule, CommonModule, FormsModule, ReactiveFormsModule, IonicModule, CreatePollPageRoutingModule],
  declarations: [CreatePollPage],
  providers: [StockService],
})
export class CreatePollPageModule {}
