import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { Usuario, Comunidad } from '../../interfaces/interfaces';
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
    
    
    
  }

  veciRed:Comunidad = {
    _id: '619f11e875415805c3424bbb',
    nombreComunidad: 'Comunidad VeciRed'

  }

  repitaPassword = '';

  constructor( public navCtrl: NavController,
               public usuarioService: UsuarioService,
               public alertasService: AlertasService,
               private menuCtrl: MenuController ) { 
                this.menuCtrl.enable(false, 'first');
               }

  ngOnInit() {
  
  }

  
  async registro(registrarse:NgForm){

    
    //validacion de campos vacios
    if(registrarse.invalid){
      this.alertasService.alerta('Complete los campos vacíos');
      return;
    }

    //validacion de contraseñas
    if(this.repitaPassword != this.userRegistro.password){
      this.alertasService.alerta('Las contraseñas no coinciden');
      return;
    } 



    const existe = await this.usuarioService.registro(this.userRegistro);

    if(existe){
      //navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      //mostrar alerta si el carreo ya se encuentra regstrado
      this.alertasService.alerta('Ese correo electronico ya existe.');
    }

  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
