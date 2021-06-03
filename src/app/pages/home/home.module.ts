import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from '../../components/components.module';
import { MenuDropdownComponent } from '../../components/menu-dropdown/menu-dropdown.component';

@NgModule({
  entryComponents: [MenuDropdownComponent],
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, HomePageRoutingModule],
  declarations: [HomePage],
})
export class HomePageModule {}
