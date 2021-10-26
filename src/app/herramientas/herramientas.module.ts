import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoPublicadoComponent } from './aviso-publicado/aviso-publicado.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: 
  [
    AvisosComponent,
    AvisoPublicadoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    AvisosComponent
  ]
})
export class HerramientasModule { }
