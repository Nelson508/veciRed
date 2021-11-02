import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoPublicadoComponent } from './aviso-publicado/aviso-publicado.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CabeceraComponent } from './cabecera/cabecera.component';




@NgModule({
  declarations: 
  [
    AvisosComponent,
    AvisoPublicadoComponent,
    CabeceraComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[
    AvisosComponent,
    CabeceraComponent
  ]
})
export class HerramientasModule { }
