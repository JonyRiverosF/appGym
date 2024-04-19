import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiDietasPageRoutingModule } from './modi-dietas-routing.module';

import { ModiDietasPage } from './modi-dietas.page';
import { ModificarDietasComponent } from 'src/app/components/modificar-dietas/modificar-dietas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiDietasPageRoutingModule
  ],
  declarations: [ModiDietasPage,ModificarDietasComponent]
})
export class ModiDietasPageModule {}
