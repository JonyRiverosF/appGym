import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarMesPage } from './pagar-mes.page';

const routes: Routes = [
  {
    path: '',
    component: PagarMesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarMesPageRoutingModule {}
