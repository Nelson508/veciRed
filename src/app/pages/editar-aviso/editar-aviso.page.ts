import { Component, OnInit } from '@angular/core';
import { Avisos, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AvisosService } from '../../servicios/avisos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-aviso',
  templateUrl: './editar-aviso.page.html',
  styleUrls: ['./editar-aviso.page.scss'],
})
export class EditarAvisoPage implements OnInit {

  avisoEdicion: Avisos = {
   
    
  }
  //routerLink="/main/tabs/editar-aviso{{aviso}}"

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private avisosService: AvisosService,
               private navController: NavController
             ) { }

  ngOnInit() 
  {
    //al cargar la pagina llamamos a obtenerRolUsuario para cargar los datos de usuario
    this.obtenerRolUsuario();
    //obtenemos el aviso enviado desde mis avisos
    this.obtenerAvisoEditar()

  }


  async editarAviso()
  {
    //console.log('click' + this.avisoEdicion.descripcion + this.avisoEdicion.titulo + this.avisoEdicion.tipoAviso);
    const actualizado = await this.avisosService.actualizarAviso(this.avisoEdicion);

    if(actualizado)
    {
      this.navController.navigateRoot('/main/tabs/mis-avisos',{animated: true});
    }else
    {
      console.log('error' + actualizado);
    }
  }


  obtenerRolUsuario()
  {
    this.usuario = this.usuarioService.obtenerRolUsuario();

  }

  obtenerAvisoEditar()
  {
    this.avisosService.Objeto.subscribe( respuesta =>
      {
        this.avisoEdicion = respuesta;
        //console.log(this.avisoEdicion);
      })
  }

}
