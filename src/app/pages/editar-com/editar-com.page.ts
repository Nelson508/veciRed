import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-editar-com',
  templateUrl: './editar-com.page.html',
  styleUrls: ['./editar-com.page.scss'],
})
export class EditarComPage implements OnInit {

  comunidadEditada: Comunidad = {};
  
  constructor( private comunidadService: ComunidadService,
               private navController: NavController,
               private alertasService: AlertasService,
    
             ) { }

  ngOnInit()
  {
    this.obtenerComunidadEditar();
  }

  editarComunidad()
  {
    if(this.comunidadEditada.nombreComunidad.length > 25)
    {
      this.alertasService.alerta('Nombre demasiado largo');
      return;
    }

    if(this.comunidadEditada.descripcion.length > 250)
    {
      this.alertasService.alerta('Descripción demasiada larga');
      return;

    }
    const actualizado = this.comunidadService.actualizarComunidad(this.comunidadEditada);
    if(actualizado)
    {
      this.comunidadEditada = {};
      this.navController.navigateRoot('/main/tabs/comunidad',{animated: true});
    }else{
      console.log('fallo');
    }
  }

  obtenerComunidadEditar()
  {
    this.comunidadService.Objeto.subscribe(
      respuesta =>
      {
        this.comunidadEditada = respuesta;

      }
    )
  }

}
