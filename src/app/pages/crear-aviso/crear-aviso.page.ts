import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvisosService } from '../../servicios/avisos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertasService } from '../../servicios/alertas.service';

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

  imagenCarrete: string;
 

  constructor(  private ruta: Router,
                private avisosService: AvisosService,
                private camera: Camera,
                public alertasService: AlertasService ) {
    
   }

   ngOnInit() {
  }
  //https://www.youtube.com/watch?v=8Sv2Nubc5MQ
   async crearAviso()
   {
     if(this.aviso.titulo.length > 30)
     {
      this.alertasService.alerta('Título demasiado largo');
      return;
     }

     if(this.aviso.descripcion.length > 222)
     {
       this.alertasService.alerta('Descripción demasiada larga');
       return;
     }
     console.log(this.aviso);
     const avisoInsertado = await this.avisosService.crearNuevoAviso(this.aviso);

     this.aviso = {
      titulo: '',
      descripcion: '',
      tipoAviso: 0
    };
    this.imagenCarrete = '';

    this.ruta.navigateByUrl('main/tabs/tab1');



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

}
