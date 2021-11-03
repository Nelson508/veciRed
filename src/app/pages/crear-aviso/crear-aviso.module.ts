import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAvisoPageRoutingModule } from './crear-aviso-routing.module';

import { CrearAvisoPage } from './crear-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAvisoPageRoutingModule
  ],
  declarations: [CrearAvisoPage]
})
export class CrearAvisoPageModule {}
