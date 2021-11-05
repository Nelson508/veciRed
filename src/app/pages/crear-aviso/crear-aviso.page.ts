import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from '../../servicios/avisos.service';



@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {
  aviso = {
    titulo: '',
    descripcion: '',
    tipoAviso: 0
  };
 

  constructor(  private ruta: Router,
                private avisosService: AvisosService ) {
    
   }

   async crearAviso()
   {
     console.log(this.aviso);
     const avisoInsertado = await this.avisosService.crearNuevoAviso(this.aviso);

     this.aviso = {
      titulo: '',
      descripcion: '',
      tipoAviso: 0
    };

    this.ruta.navigateByUrl('main/tabs/tab1');



   }

  ngOnInit() {
  }

}
