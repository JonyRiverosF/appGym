import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroUserPage } from './registro-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroUserPageRoutingModule {}
