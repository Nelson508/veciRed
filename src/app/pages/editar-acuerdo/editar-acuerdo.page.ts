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
    duracion:0,
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
      duracion:0,
      opciones: {}
    }
  }

  async actualizar(){

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
