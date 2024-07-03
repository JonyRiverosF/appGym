import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarMesPageRoutingModule } from './pagar-mes-routing.module';

import { PagarMesPage } from './pagar-mes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagarMesPageRoutingModule
  ],
  declarations: [PagarMesPage]
})
export class PagarMesPageModule {}
