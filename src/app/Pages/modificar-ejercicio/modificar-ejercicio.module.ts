import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEjercicioPageRoutingModule } from './modificar-ejercicio-routing.module';

import { ModificarEjercicioPage } from './modificar-ejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEjercicioPageRoutingModule
  ],
  declarations: [ModificarEjercicioPage]
})
export class ModificarEjercicioPageModule {}
