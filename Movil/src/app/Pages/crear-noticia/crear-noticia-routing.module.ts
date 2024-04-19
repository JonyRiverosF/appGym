import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearNoticiaPage } from './crear-noticia.page';

const routes: Routes = [
  {
    path: '',
    component: CrearNoticiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearNoticiaPageRoutingModule {}
