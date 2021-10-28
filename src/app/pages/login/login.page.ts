import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  User = {
    email: 'nelson.dominguez@gmail.com',
    password: '123456'
  
  };

  constructor( public navCtrl: NavController,
               public usuarioService: UsuarioService ) { }

  ngOnInit() {
  }

  login(logearse: NgForm){

    if(logearse.invalid){return;}

    this.usuarioService.login(this.User.email, this.User.password);
  }

  registrarse() {
    this.navCtrl.navigateRoot('/registro');
  }
}
