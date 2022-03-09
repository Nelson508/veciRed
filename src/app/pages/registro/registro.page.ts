import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Usuario, Comunidad } from '../../interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 
  /* El método getTimezoneOffset() devuelve la diferencia, 
  en minutos, entre una fecha evaluada en la zona horaria UTC y 
  la misma fecha evaluada en la zona horaria local. 
  Luego se multiplican los minutos por 60000 obteniedo la diferencia horaria en milisegundos */
  diferenciaZonaHorariaLocal = (new Date()).getTimezoneOffset() * 60000;
  maxTime = (new Date(Date.now() - this.diferenciaZonaHorariaLocal)).toISOString().slice(0, -1);

  userRegistro: Usuario = {
    nombre: '',
    fechaNacimiento: null,
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

  
  async registro(){

    const datepipe: DatePipe = new DatePipe('en-US');
    this.userRegistro.fechaNacimiento  = datepipe.transform(this.userRegistro.fechaNacimiento ,'YYYY-MM-dd');
    this.maxTime = datepipe.transform(this.maxTime,'YYYY-MM-dd');

    const validado = this.validacion();

    if(validado == null){

      const existe = await this.usuarioService.registro(this.userRegistro);
  
      if(existe){
        //navegar al tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
      }else{
        //mostrar alerta si el carreo ya se encuentra regstrado
        this.alertasService.alerta('Ese correo electronico ya existe.');
      }
    }
  }

  validacion(){

    //Validación caracteres extraños en nombre
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,50})+$/g;

    if(caracteres.test(this.userRegistro.nombre) == false){

      return this.alertasService.alerta('El nombre de usuario no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres y un máximo de 50.');
    }

    if(this.userRegistro.fechaNacimiento == null){

      return this.alertasService.alerta('Debe seleccionar una día.');
    }
  
    //Validar que la fecha no sea mayor a la fecha actual
    if(this.userRegistro.fechaNacimiento > this.maxTime){
      
      return this.alertasService.alerta('El día seleccionado no debe ser mayor a la fecha actual.');
    }

    //Validación de correo
    var correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(correo.test(this.userRegistro.email) == false){

      return this.alertasService.alerta('Debe ingresar un correo valido.');
    }

    if(this.userRegistro.email.length > 150){

      return this.alertasService.alerta('El correo electrónico no puede tener más de 150 caracteres.');
    }

    if(this.userRegistro.password.length < 6){

      return this.alertasService.alerta('La contraseña no puede tener menos de 6 caracteres.'); 
    }

    if(this.userRegistro.password.length > 100){

      return this.alertasService.alerta('La contraseña no puede tener más de 100 caracteres.'); 
    }
    
    //Validación de contraseñas
    if(this.repitaPassword != this.userRegistro.password){

      return this.alertasService.alerta('Las contraseñas no coinciden.'); 
    }

    return null;
  }

  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
