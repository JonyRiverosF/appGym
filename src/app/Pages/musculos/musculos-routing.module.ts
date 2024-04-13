import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusculosPage } from './musculos.page';

const routes: Routes = [
  {
    path: '',
    component: MusculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusculosPageRoutingModule {}
