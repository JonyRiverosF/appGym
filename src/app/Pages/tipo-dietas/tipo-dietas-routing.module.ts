import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoDietasPage } from './tipo-dietas.page';

const routes: Routes = [
  {
    path: '',
    component: TipoDietasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoDietasPageRoutingModule {}
