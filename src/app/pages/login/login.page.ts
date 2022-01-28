import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, MenuController, Platform } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertasService } from '../../servicios/alertas.service';
import { PushService } from '../../servicios/push.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  User = {
    email: 'test3@test3.com',
    password: '123456'
    /* email: '',
    password: ''
   */
  };

  //Array que guarda las comunidades
  arrayComunidades = [];

  constructor( public navCtrl: NavController,
               public usuarioService: UsuarioService,
               public alertasService: AlertasService,
               private menuCtrl: MenuController,
               private platform: Platform,
               private pushService: PushService ) { 
                this.menuCtrl.enable(false, 'first');
               }

  ngOnInit() {
  }

  async login(logearse: NgForm){

    if(logearse.invalid){
      
      this.alertasService.alerta('Complete los campos vacíos');
      return;
    }

    const existe = await this.usuarioService.login(this.User.email, this.User.password);

    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});

      if(this.platform.is('capacitor')){
        this.pushService.setUserId();
      }
      
    }else{
      //mostrar alerta de usuario y contraseña no correctos
      this.alertasService.alerta('Usario y/o contraseña no son correctos');
    }

  }

  registrarse() {
    this.navCtrl.navigateRoot('/registro');
  }

  /* async comunidadesUsuario(){

    await this.usuarioService.obtenerArrayComunidadesUsuario().subscribe(
      async respuesta =>
     {
       this.arrayComunidades = await respuesta['comunidades']['comunidad']; 
       console.log('Respuesta de mis comunidades: ' + this.arrayComunidades);
     }
   )

   console.log('Mis comunidades: ' + this.arrayComunidades);
   this.pushService.setUserId(this.arrayComunidades);

  } */
}
