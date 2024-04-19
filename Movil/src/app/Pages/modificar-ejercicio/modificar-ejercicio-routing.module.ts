import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarEjercicioPage } from './modificar-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarEjercicioPageRoutingModule {}
