import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarDietaPageRoutingModule } from './modificar-dieta-routing.module';

import { ModificarDietaPage } from './modificar-dieta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarDietaPageRoutingModule
  ],
  declarations: [ModificarDietaPage]
})
export class ModificarDietaPageModule {}
