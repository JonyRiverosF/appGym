import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarRegistroPageRoutingModule } from './confirmar-registro-routing.module';

import { ConfirmarRegistroPage } from './confirmar-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarRegistroPageRoutingModule
  ],
  declarations: [ConfirmarRegistroPage]
})
export class ConfirmarRegistroPageModule {}
