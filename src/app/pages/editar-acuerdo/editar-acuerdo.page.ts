import { Component, OnInit } from '@angular/core';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-acuerdo',
  templateUrl: './editar-acuerdo.page.html',
  styleUrls: ['./editar-acuerdo.page.scss'],
})
export class EditarAcuerdoPage implements OnInit {

  //tempImages: string[] = [];

  acuerdo: Acuerdos = {

    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController,
              private router: Router) { }

  ngOnInit() {

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

  /* async crearAcuerdo(){

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
      opciones: {}
    };


    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
  } */

  mostrarOpciones(){

    /* if(this.acuerdo['tipo']){

      this.acuerdo.opciones = {};
      
    }else if(this.acuerdo['tipo'] == false){ */
      //this.acuerdo = this.acuerdo;
      this.acuerdosService.enviarDatos(this.acuerdo);
      this.router.navigate(['/main/tabs/editar-opciones']);
      //this.navCtrl.navigateRoot('/main/tabs/editar-opciones');
      //this.acuerdo = this.acuerdo;
   // }
    //this.navCtrl.navigateRoot('/main/tabs/editar-opciones');

    /* this.acuerdo = {
      titulo:'',
      descripcion:'',
      fecha:null,
      hora:null
    } */
  
  }

  volverAtras(){

    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});

    this.acuerdo = {
      titulo:'',
      descripcion:'',
      fecha:null,
      hora:null,
      opciones: {}
    }
  }

  async actualizar(){

    //if(formActualizar.invalid){return;} 

    const actualizado = await this.acuerdosService.actualizarAcuerdo(this.acuerdo);

    if(actualizado){
      //Mensaje actualizado
      this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
    }else{
      //Mensaje error
      console.log('No se logra' + actualizado);

    }

  }

}
