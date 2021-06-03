import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePollPageRoutingModule } from './create-poll-routing.module';

import { CreatePollPage } from './create-poll.page';
import { ComponentsModule } from '../../components/components.module';
import { EventService } from '../event/event.service';

@NgModule({
  imports: [ComponentsModule, CommonModule, FormsModule, ReactiveFormsModule, IonicModule, CreatePollPageRoutingModule],
  declarations: [CreatePollPage],
  providers: [EventService],
})
export class CreatePollPageModule {}
