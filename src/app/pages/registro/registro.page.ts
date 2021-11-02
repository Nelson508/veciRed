import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  userRegistro: Usuario = {
    nombre: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    rol: 2,
    
  }

  constructor( public navCtrl: NavController,
               public usuarioService: UsuarioService,
               public alertasService: AlertasService ) { }

  ngOnInit() {
  }

  
  async registro(registrarse:NgForm){

    if(registrarse.invalid){return;}

    const existe = await this.usuarioService.registro(this.userRegistro);

    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      //mostrar alerta de usuario y contraseña no correctos
      this.alertasService.alerta('Ese correo electronico ya existe.');
    }

  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
