import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './servicios/usuario.service';
import { AvisosService } from './servicios/avisos.service';
import { NavController, MenuController } from '@ionic/angular';
import { Usuario } from './interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  Roltype = [];
  usuario: Usuario = {};
  constructor( private usuarioService: UsuarioService,
               private avisosService: AvisosService,
               private navController: NavController,
               public menuCtrl: MenuController) {}
  
  ngOnInit() 
  {
    
     
  }

  logout(){
    this.avisosService.contadorPagina = 0;
    this.usuarioService.logout();
  }

  goToMisAvisos()
  {
    this.navController.navigateRoot('/main/tabs/mis-avisos',{animated: true});

  }

  obtenerRolUsuario()
  {
    this.Roltype = [];
    this.usuario = {};
    this.usuario = this.usuarioService.obtenerRolUsuario();
    this.Roltype[0] = this.usuario.rol;
  }

  

  menuOpened()
  {
    
    this.obtenerRolUsuario();
  }




}
