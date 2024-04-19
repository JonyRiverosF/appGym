import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusculosPageRoutingModule } from './musculos-routing.module';

import { MusculosPage } from './musculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusculosPageRoutingModule
  ],
  declarations: [MusculosPage]
})
export class MusculosPageModule {}
