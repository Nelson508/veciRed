import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from '../../servicios/avisos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertasService } from '../../servicios/alertas.service';
import { ModalController, Platform } from '@ionic/angular';
import { AvisoModalComponent } from 'src/app/herramientas/aviso-modal/aviso-modal.component';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../servicios/usuario.service';
import { PushService } from '../../servicios/push.service';

declare var window: any;

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {
  aviso = {
    titulo: '',
    descripcion: '',
    tipoAviso: 0,

  };

  Roltype = [];
  rol;

  plataforma:boolean;
  imagenCarrete: string;

  usuario: Usuario = {};

 
  constructor(  private ruta: Router,
                private avisosService: AvisosService,
                private camera: Camera,
                public alertasService: AlertasService,
                private modalController: ModalController,
                private usuarioService: UsuarioService,
                private pushService: PushService,
                private platform: Platform ) {
    
   }

   ngOnInit() {
    //this.obtenerRolUsuario();
    if(this.platform.is('capacitor')){
      this.plataforma = false;
    }else{
      this.plataforma = true;
    }
    
  }
  
   async crearAviso()
   {
     const validado = this.validacion();

     if(validado == null)
     {
       const avisoInsertado = await this.avisosService.crearNuevoAviso(this.aviso);

      if(this.aviso.tipoAviso == 1)
      {
        this.pushService.enviarNotificacion(this.aviso.titulo,this.aviso.descripcion);
      }
      //Vaciamos las variables para limpiar los campos
      this.aviso = {
        titulo: '',
        descripcion: '',
        tipoAviso: 0
      };
      this.imagenCarrete = '';
      this.Roltype = [];
      this.usuario = {};

      this.ruta.navigateByUrl('main/tabs/tab1');
      this.alertasService.presentToast('Aviso publicado exitosamente'); 
     }

     
   }

  


  getImagen()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      //sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    const imagen = window.Ionic.WebView.convertFileSrc(imageData);
    //console.log(imagen);
    this.avisosService.uploadImagen(imageData);
    this.imagenCarrete = imagen;
    
    }, (err) => {
     console.log(err);
    });



  }

  async openModal()
  {
    const modal = await this.modalController.create({
      component: AvisoModalComponent

    });

    await modal.present();
  }

  obtenerRolUsuario()
  {
    
    this.usuarioService.obtenerRolBD().subscribe( 
      respuesta =>
      {
        this.rol = respuesta['currentRol'];
      }
    )


  }

  ionViewWillEnter() {
    //Vaciamos las variables para limpiar los campos
    this.aviso = {
      titulo: '',
      descripcion: '',
      tipoAviso: 0
    };
    this.imagenCarrete = '';
    this.Roltype = [];
    this.usuario = {};
    this.obtenerRolUsuario();

    
  }

  validacion()
  {
    //Validaci??n caracteres extra??os en nombre
    var caracteres = /(^[A-Za-z????????????????????????0-9??!???@-_.,/()= ]{1,50})+$/g;
    

    if(caracteres.test(this.aviso.titulo) == false){
     
     return this.alertasService.alerta('El t??tulo no permite tener caracteres especiales');
   }

   var caracteres2 = /(^[A-Za-z????????????????????????0-9??!???@-_.,/()= ]{1,250})+$/g;
   if(caracteres2.test(this.aviso.descripcion) == false){
     
     return this.alertasService.alerta('La descripci??n no permite tener caracteres especiales');
   }
    if(this.aviso.titulo.length > 30)
    {
     return this.alertasService.alerta('T??tulo demasiado largo');
    }

    if(this.aviso.titulo.length <= 2)
    {
     return this.alertasService.alerta('T??tulo debe tener m??s de 3 caracteres');
    }

    if(this.aviso.descripcion.length > 250)
    {
      return this.alertasService.alerta('Descripci??n demasiada larga');
    }
    if(this.aviso.descripcion.length <= 2)
    {
      return this.alertasService.alerta('Descripci??n debe tener m??s de 3 caracteres');
    }

    if(this.aviso.tipoAviso == 0)
    {
      return this.alertasService.alerta('Debe seleccionar un tipo aviso');
    }

    return null;

  }

}
