import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvisosComponent } from './avisos/avisos.component';
import { AvisoPublicadoComponent } from './aviso-publicado/aviso-publicado.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { NuevoAvisoComponent } from './nuevo-aviso/nuevo-aviso.component';
import { FormsModule } from '@angular/forms';
import { AcuerdosComunidadComponent } from './acuerdos-comunidad/acuerdos-comunidad.component';
import { AcuerdoPublicadoComponent } from './acuerdo-publicado/acuerdo-publicado.component';




@NgModule({
  declarations: 
  [
    AvisosComponent,
    AvisoPublicadoComponent,
    CabeceraComponent,
    NuevoAvisoComponent,
    AcuerdosComunidadComponent,
    AcuerdoPublicadoComponent
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
    NuevoAvisoComponent,
    AcuerdosComunidadComponent
  ]
})
export class HerramientasModule { }
