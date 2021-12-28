import { DatePipe  } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';
import { OpcionesPage } from '../opciones/opciones.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-crear-acuerdo',
  templateUrl: './crear-acuerdo.page.html',
  styleUrls: ['./crear-acuerdo.page.scss'],
})
export class CrearAcuerdoPage implements OnInit {

  @ViewChild(OpcionesPage) child;

  tempImages: string;

  minTime: String = new Date().toISOString();

  acuerdo: Acuerdos = {

    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    duracion:null,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController,
              private camera: Camera) { }

  ngOnInit() {

    this.acuerdosService.Objeto.subscribe(respuesta =>{

      console.log(respuesta['tipo']);
      this.acuerdo.opciones = respuesta;
      console.log(this.acuerdo.opciones);
    });
  }

  async crearAcuerdo(){

    console.log(this.acuerdo);

    const datepipe: DatePipe = new DatePipe('en-US');

    let fecha = new Date(this.acuerdo.fecha);

    let days = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    var diaSemana = days[fecha.getUTCDay()-1];

    this.acuerdo.fecha = diaSemana + datepipe.transform(fecha,', dd-MM-YYYY');
    this.acuerdo.hora = datepipe.transform(this.acuerdo.hora,'HH:mm');

    const acuerdoCreado = await this.acuerdosService.crearAcuerdo(this.acuerdo);


    console.log(this.acuerdo);
    console.log(this.acuerdo.fecha);

    this.acuerdo = { 
      titulo:'',
      descripcion:'',
      fecha:null,
      hora:null,
      duracion:null,
      opciones: {}
    };

    this.tempImages = '';

    this.acuerdosService.limpiar(true);

    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
  }

  galeria(){

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
      const imagen = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(imagen);

      /*    this.avisosService.uploadImagen(imageData);
      this.imagenCarrete = imagen;
      */
      this.acuerdosService.subirImagen(imageData);
      this.tempImages = imagen;
      
    }, (err) => {
     console.log(err);
    });
  }

  mostrarOpciones(){

    this.acuerdo.opciones = {};  
    this.navCtrl.navigateRoot('/main/tabs/opciones', {animated: true});
  }

  volverAtras() {

    this.acuerdosService.limpiar(true);
    
    this.acuerdo = {
      titulo:'',
      descripcion:'',
      fecha:null,
      hora:null,
      duracion:null,
      opciones: {}
    }
  }
}
