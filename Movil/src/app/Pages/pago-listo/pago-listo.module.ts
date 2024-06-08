import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoListoPageRoutingModule } from './pago-listo-routing.module';

import { PagoListoPage } from './pago-listo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoListoPageRoutingModule
  ],
  declarations: [PagoListoPage]
})
export class PagoListoPageModule {}
