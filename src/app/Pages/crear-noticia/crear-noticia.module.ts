import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearNoticiaPageRoutingModule } from './crear-noticia-routing.module';

import { CrearNoticiaPage } from './crear-noticia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearNoticiaPageRoutingModule
  ],
  declarations: [CrearNoticiaPage]
})
export class CrearNoticiaPageModule {}
