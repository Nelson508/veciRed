import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertasService } from '../../servicios/alertas.service';
import { ComunidadService } from '../../servicios/comunidad.service';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-com',
  templateUrl: './crear-com.page.html',
  styleUrls: ['./crear-com.page.scss'],
})
export class CrearComPage implements OnInit {

  comunidad = {
    nombreComunidad: '',
    descripcion: '',
    coordenadas: '',
    usuario: ''
  }

  usuario: Usuario = {};

  constructor( private alertasService: AlertasService,
               private comunidadService: ComunidadService,
               private navController: NavController,
               private usuarioService: UsuarioService

             ) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  async crearComunidad()
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

    const comunidadCreada =  await this.comunidadService.crearComunidad(this.comunidad);
    if(comunidadCreada)
    {
      this.comunidad = {
        nombreComunidad: '',
        descripcion: '',
        coordenadas: '',
        usuario: ''
      }

      this.navController.navigateRoot('main/tabs/comunidad');
      
    }
    
    console.log(this.comunidad);
  }


  obtenerUsuario()
  {
    this.usuario = this.usuarioService.obtenerRolUsuario();
    console.log(this.usuario);
    console.log(this.usuario._id);
    this.comunidad.usuario = this.usuario._id;
    console.log(this.comunidad.usuario);

  }

}
