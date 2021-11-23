import { Component } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';
import { AvisosService } from './servicios/avisos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private usuarioService: UsuarioService,
               private avisosService: AvisosService,
               private navController: NavController) {}

  logout(){
    this.avisosService.contadorPagina = 0;
    this.usuarioService.logout();
  }

  goToMisAvisos()
  {
    this.navController.navigateRoot('/main/tabs/mis-avisos',{animated: true});

  }
}
