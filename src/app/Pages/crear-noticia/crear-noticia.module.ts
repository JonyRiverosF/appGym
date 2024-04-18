import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearNoticiaPageRoutingModule } from './crear-noticia-routing.module';

import { CrearNoticiaPage } from './crear-noticia.page';
import { ModificarNoticiasComponent } from 'src/app/components/modificar-noticias/modificar-noticias.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearNoticiaPageRoutingModule
  ],
  declarations: [CrearNoticiaPage, ModificarNoticiasComponent]
})
export class CrearNoticiaPageModule {}
