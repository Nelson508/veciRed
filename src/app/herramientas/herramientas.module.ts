import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoPublicadoComponent } from './aviso-publicado/aviso-publicado.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NuevoAvisoComponent } from './nuevo-aviso/nuevo-aviso.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: 
  [
    AvisosComponent,
    AvisoPublicadoComponent,
    CabeceraComponent,
    NuevoAvisoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  exports:[
    AvisosComponent,
    CabeceraComponent,
    NuevoAvisoComponent
  ]
})
export class HerramientasModule { }
