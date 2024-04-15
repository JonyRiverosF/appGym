import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarNoticiaPageRoutingModule } from './modificar-noticia-routing.module';

import { ModificarNoticiaPage } from './modificar-noticia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarNoticiaPageRoutingModule
  ],
  declarations: [ModificarNoticiaPage]
})
export class ModificarNoticiaPageModule {}
