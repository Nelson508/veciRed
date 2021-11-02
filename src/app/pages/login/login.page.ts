import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  User = {
    email: 'test3@test3.com',
    password: '123456'
  
  };

  constructor( public navCtrl: NavController,
               public usuarioService: UsuarioService,
               public alertasService: AlertasService ) { }

  ngOnInit() {
  }

  async login(logearse: NgForm){

    if(logearse.invalid){return;}

    const existe = await this.usuarioService.login(this.User.email, this.User.password);

    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      //mostrar alerta de usuario y contraseña no correctos
      this.alertasService.alerta('Usario y/o contraseña no son correctos.');
    }
  }

  registrarse() {
    this.navCtrl.navigateRoot('/registro');
  }
}
