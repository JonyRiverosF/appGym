import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroUserPageRoutingModule } from './registro-user-routing.module';

import { RegistroUserPage } from './registro-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroUserPageRoutingModule
  ],
  declarations: [RegistroUserPage]
})
export class RegistroUserPageModule {}
