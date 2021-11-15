import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';

@Component({
  selector: 'app-crear-acuerdo',
  templateUrl: './crear-acuerdo.page.html',
  styleUrls: ['./crear-acuerdo.page.scss'],
})
export class CrearAcuerdoPage implements OnInit {

  tempImages: string[] = [];

  acuerdo = {
    titulo:'',
    descripcion:'',
    fecha:'',
    opciones: {}
  }

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }

  ngOnInit() {

    this.acuerdosService.Objeto.subscribe(respuesta =>{

      console.log(respuesta);
      this.acuerdo.opciones = respuesta;
      console.log(this.acuerdo.opciones);
    });

    
  }

  async crearAcuerdo(){

    console.log(this.acuerdo);
    
    const acuerdoCreado = await this.acuerdosService.crearAcuerdo(this.acuerdo);

    this.acuerdo = { 
      titulo:'',
      descripcion:'',
      fecha:'',
      opciones: {}
    };


    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
  }

  mostrarOpciones(){

    this.acuerdo.opciones = {};

    this.navCtrl.navigateRoot('/main/tabs/opciones', {animated: true});
  
  }

  volverAtras(){

    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});

    this.acuerdo = {
      titulo:'',
      descripcion:'',
      fecha:'',
      opciones: {}
    }
  }
}
