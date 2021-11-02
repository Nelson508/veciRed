import { Component } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';
import { AvisosService } from './servicios/avisos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private usuarioService: UsuarioService,
               private avisosService: AvisosService) {}

  logout(){
    this.avisosService.contadorPagina = 0;
    this.usuarioService.logout();
  }
}
