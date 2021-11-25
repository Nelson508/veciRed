import { DatePipe  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';


@Component({
  selector: 'app-crear-acuerdo',
  templateUrl: './crear-acuerdo.page.html',
  styleUrls: ['./crear-acuerdo.page.scss'],
})
export class CrearAcuerdoPage implements OnInit {

  tempImages: string[] = [];

  acuerdo: Acuerdos = {

    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    duracion:0,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }

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
      duracion:0,
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
      fecha:null,
      hora:null,
      duracion:0,
      opciones: {}
    }

  }
}
