import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcuerdosPageRoutingModule } from './acuerdos-routing.module';

import { AcuerdosPage } from './acuerdos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcuerdosPageRoutingModule
  ],
  declarations: [AcuerdosPage]
})
export class AcuerdosPageModule {}
