import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEjercicioPageRoutingModule } from './modificar-ejercicio-routing.module';

import { ModificarEjercicioPage } from './modificar-ejercicio.page';
import { ModificarEjerciciosComponent } from 'src/app/components/modificar-ejercicios/modificar-ejercicios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEjercicioPageRoutingModule
  ],
  declarations: [ModificarEjercicioPage,ModificarEjerciciosComponent]
})
export class ModificarEjercicioPageModule {}
