import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearDietaPage } from './crear-dieta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDietaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearDietaPageRoutingModule {}
