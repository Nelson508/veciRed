import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-crear-com',
  templateUrl: './crear-com.page.html',
  styleUrls: ['./crear-com.page.scss'],
})
export class CrearComPage implements OnInit {

  comunidad = {
    nombreComunidad: '',
    descripcion: '',
    coordenadas: ''
  }

  constructor( private alertasService: AlertasService

             ) { }

  ngOnInit() {
  }

  crearComunidad()
  {

    if(this.comunidad.nombreComunidad.length > 25)
    {
      this.alertasService.alerta('Nombre demasiado largo');
      return;
    }

    if(this.comunidad.descripcion.length > 250)
    {
      this.alertasService.alerta('Descripción demasiada larga');
      return;

    }
    console.log('click');
    console.log(this.comunidad);
  }

}
