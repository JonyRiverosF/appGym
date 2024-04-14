import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoDietasPageRoutingModule } from './tipo-dietas-routing.module';

import { TipoDietasPage } from './tipo-dietas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoDietasPageRoutingModule
  ],
  declarations: [TipoDietasPage]
})
export class TipoDietasPageModule {}
