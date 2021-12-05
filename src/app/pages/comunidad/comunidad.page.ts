import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';
import { Router } from '@angular/router';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage implements OnInit {

  
  Comunidad: Comunidad[] = [];

  roles = [];

  contador =0;

  constructor( private usuarioService: UsuarioService,
               private comunidadService: ComunidadService,
               private ruta: Router,
               private alertasService: AlertasService
              ) { }

  ngOnInit() {
    this.obtenerComunidades();
    this.comunidadService.nuevaComunidad.subscribe(
      respuesta =>
      {
        this.Comunidad = [];
        this.obtenerComunidades();
      }
    )

  }

  obtenerComunidades()
  {
    this.usuarioService.obtenerComunidadUsuario().subscribe(
      respuesta =>
      {
      
        console.log(respuesta);
        this.Comunidad.push(...respuesta['comunidades']['comunidad']);
        console.log(respuesta['comunidades']['rol']);
        this.roles.push(...respuesta['comunidades']['rol']);
        
      }
    )

  }

  editarComunidad(comunidad, indexOfelement)
  {

    
    if(this.roles[indexOfelement] == 2)
    {
      this.alertasService.alerta('No tienes permiso para actualizar esta comunidad');
      return;
    }else{
      this.comunidadService.enviarDatos(comunidad);
      this.ruta.navigateByUrl('main/tabs/editar-com');
    }
    

  }

  async abandonarComunidad(comunidad, indexOfelement)
  {
    console.log('click');
    console.log(comunidad);
    console.log(indexOfelement);
    if(indexOfelement === 0)
    {
      this.alertasService.alerta('No puedes abandonar esta comunidad');

    }else{
      await this.alertasService.alertaDecision('¿Deseas abandonar esta comunidad?')
      .then( respuesta =>
        {
          if(respuesta['data'] === true)
          {
            console.log('OK');
          }else{
            console.log('FALSE');
          }
        }
        
        )

    }
    

  }

}
