import { Component, OnInit } from '@angular/core';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { NavController, Platform } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertasService } from '../../servicios/alertas.service';

declare var window: any;

@Component({
  selector: 'app-editar-acuerdo',
  templateUrl: './editar-acuerdo.page.html',
  styleUrls: ['./editar-acuerdo.page.scss'],
})
export class EditarAcuerdoPage implements OnInit {

  tempImages: string;
  minTime: String = new Date(new Date().setHours(new Date().getHours() - 48)).toISOString();
  plataforma:boolean;

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
              private router: Router,
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

      if(respuesta['tipo']){


        var res = respuesta;
        console.log(respuesta);
        this.acuerdo = res;
        console.log(this.acuerdo);

        

      }else if(respuesta['tipo'] == false){

        console.log(respuesta['tipo']);
        this.acuerdo.opciones = respuesta;
        console.log(this.acuerdo.opciones);
          
      }

    });
  }

  mostrarOpciones(){

    this.acuerdosService.enviarDatos(this.acuerdo);
    this.router.navigate(['/main/tabs/editar-opciones']);
  }

  volverAtras(){

    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});

    this.acuerdo = {
      titulo:'',
      descripcion:'',
      fecha:null,
      hora:null,
      duracion:null,
      opciones: {}
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

      this.acuerdosService.subirImagen(imageData);
      this.tempImages = imagen;
      
    }, (err) => {
     console.log(err);
    });
  }

  async actualizar(){

    const validado = this.validacion();

    if(validado == null){

      const datepipe: DatePipe = new DatePipe('en-US');
  
      let fecha = new Date(this.acuerdo.fecha);
  
      this.acuerdo.fecha = datepipe.transform(fecha,'YYYY-MM-dd');
      
      const actualizado = await this.acuerdosService.actualizarAcuerdo(this.acuerdo);
  
      if(actualizado){
        //Mensaje actualizado
        this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
        this.alertasService.presentToast('Acuerdo modificado exitosamente');
      }else{
        //Mensaje error
        this.alertasService.presentToast('El acuerdo no pudo ser modificado');
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
}
