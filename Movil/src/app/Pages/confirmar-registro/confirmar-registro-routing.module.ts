import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarRegistroPage } from './confirmar-registro.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarRegistroPageRoutingModule {}
