import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEventPageRoutingModule } from './create-event-routing.module';

import { CreateEventPage } from './create-event.page';
import { ComponentsModule } from '../../../components/components.module';
import { EventService } from '../event.service';

@NgModule({
  imports: [ComponentsModule, CommonModule, FormsModule, ReactiveFormsModule, IonicModule, CreateEventPageRoutingModule],
  declarations: [CreateEventPage],
  providers: [EventService],
})
export class CreateEventPageModule {}
