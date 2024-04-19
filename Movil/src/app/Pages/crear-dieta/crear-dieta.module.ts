import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearDietaPageRoutingModule } from './crear-dieta-routing.module';

import { CrearDietaPage } from './crear-dieta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDietaPageRoutingModule
  ],
  declarations: [CrearDietaPage]
})
export class CrearDietaPageModule {}
