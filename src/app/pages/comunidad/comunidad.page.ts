import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage implements OnInit {

  usuario: Usuario = {
    
  };
  Comunidad: Comunidad[] = [];

  constructor( private usuarioService: UsuarioService,
               private comunidadService: ComunidadService 
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
        this.usuario = respuesta;
        this.Comunidad.push(...respuesta['comunidades']['comunidad']);    
      }
    )

  }

}
