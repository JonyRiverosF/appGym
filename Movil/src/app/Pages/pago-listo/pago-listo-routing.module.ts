import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoListoPage } from './pago-listo.page';

const routes: Routes = [
  {
    path: '',
    component: PagoListoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoListoPageRoutingModule {}
