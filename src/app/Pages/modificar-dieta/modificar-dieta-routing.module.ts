import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarDietaPage } from './modificar-dieta.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarDietaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarDietaPageRoutingModule {}
