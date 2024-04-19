import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModiDietasPage } from './modi-dietas.page';

const routes: Routes = [
  {
    path: '',
    component: ModiDietasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModiDietasPageRoutingModule {}
