import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {}
  
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.obtenerUsuario();
  }
  obtenerUsuario()
  {
    this.usuarioService.obtenerDataPerfil().subscribe(
      respuesta =>
      {
        //console.log(respuesta['usuarioBD'])
        this.usuario = respuesta['usuarioBD'];
        //console.log(this.usuario.fechaNacimiento);
        // var date: Date = this.usuario.fechaNacimiento
        // var dd = String(this.usuario.fechaNacimiento.getDate()).padStart(2, '0');
        // var mm = String(this.usuario.fechaNacimiento.getMonth() + 1).padStart(2, '0'); //January is 0!
        // var yyyy = this.usuario.fechaNacimiento.getFullYear();
      }
    )
  }

}
