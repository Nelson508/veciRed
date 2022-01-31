import { DatePipe  } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';
import { OpcionesPage } from '../opciones/opciones.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertasService } from '../../servicios/alertas.service';

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

  plataforma:boolean;

  acuerdo: Acuerdos = 
  {
    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    duracion:null,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController,
              private camera: Camera,
              private alertasService: AlertasService,
              private platform: Platform) { }

  ngOnInit() {

    if(this.platform.is('capacitor')){
      this.plataforma = false;
    }else{
      this.plataforma = true;
    }

    this.acuerdosService.Objeto.subscribe(respuesta =>{

      console.log(respuesta['tipo']);
      this.acuerdo.opciones = respuesta;
      console.log(this.acuerdo.opciones);
    });
  }

  async crearAcuerdo(){

    const validado = this.validacion();

    if(validado == null){

      console.log(this.acuerdo);
  
      const datepipe: DatePipe = new DatePipe('en-US');
  
      let fecha = new Date(this.acuerdo.fecha);
  
      this.acuerdo.fecha = datepipe.transform(fecha,'YYYY-MM-dd');
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

      if(acuerdoCreado){

        this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
        this.alertasService.presentToast('Acuerdo creado exitosamente'); 
      }else{
        this.alertasService.presentToast('El acuerdo no pudo ser creado');
      }
  
    }

  }

  validacion(){
    //Validación caracteres extraños en titulo
    var caracteresTitulo = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresTitulo.test(this.acuerdo.titulo) == false){
      
      return this.alertasService.alerta('El título del acuerdo no permite tener los caracteres ingresados');
    }

    //Validación caracteres extraños en la descripción
    var caracteresDescripcion = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresDescripcion.test(this.acuerdo.descripcion) == false){
      
      return this.alertasService.alerta('La descripción del acuerdo no permite tener los caracteres ingresados');
    }

    //Validación duracion del acuerdo
    if(this.acuerdo.duracion > 48){
      
      return this.alertasService.alerta('La duración del acuerdo no puede ser mayor a 48 horas');
    }
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
