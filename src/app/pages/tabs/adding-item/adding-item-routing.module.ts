import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddingItemPage } from './adding-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddingItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddingItemPageRoutingModule {}
