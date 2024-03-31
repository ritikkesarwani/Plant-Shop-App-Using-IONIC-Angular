import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddingItemPageRoutingModule } from './adding-item-routing.module';

import { AddingItemPage } from './adding-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddingItemPageRoutingModule
  ],
  declarations: [AddingItemPage]
})
export class AddingItemPageModule {}
