import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { Comunidad } from '../../interfaces/interfaces';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
})
export class ComunidadPage implements OnInit {

  usuario: Usuario = {
    
  };
  Comunidad: Comunidad[] = [];

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerComunidades();
  }

  obtenerComunidades()
  {
    this.usuarioService.obtenerComunidadUsuario().subscribe(
      respuesta =>
      {
        this.usuario = respuesta;
        //this.comunidad.push(...this.usuario.comunidad);
        //console.log(respuesta['comunidades']['comunidad'][0].nombreComunidad);
        console.log(respuesta['comunidades']['comunidad'][0]);
        this.Comunidad.push(...respuesta['comunidades']['comunidad']);
        console.log('comunidad' + this.Comunidad );
        //console.log(this.usuario);
        //console.log(this.usuario.comunidad[0]['_id']);
        
      }
    )

  }

}
