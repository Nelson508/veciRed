import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-acuerdo-publicado',
  templateUrl: './acuerdo-publicado.component.html',
  styleUrls: ['./acuerdo-publicado.component.scss'],
})
export class AcuerdoPublicadoComponent implements OnInit {

  @Input() acuerdoPublicado: Acuerdos = {};
  ocultar: boolean = true;

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController,
              private alertasService: AlertasService) { }

  ngOnInit() {

    if(this.acuerdoPublicado.estado == 1){
      this.ocultar = true;
      console.log(this.ocultar);
    }else if(this.acuerdoPublicado.estado == 2){
      this.ocultar = false;
      console.log(this.ocultar);
      
    }
    
  }

  abrirEditar(){

    this.acuerdosService.enviarDatos(this.acuerdoPublicado, true);
    //this.router.navigate(['/main/tabs/crear-acuerdo']);
    this.navCtrl.navigateRoot('/main/tabs/editar-acuerdo');
  }

  async eliminar(){

    await this.alertasService.alertaDecision('¿Desea eliminar este acuerdo?').then( respuesta => {

      if(respuesta['data'] === true){

        this.acuerdoPublicado.estado = 0;
        console.log(this.acuerdoPublicado);
        this.acuerdosService.eliminarAcuerdo(this.acuerdoPublicado);
        console.log(respuesta['data']);
      }else{

        console.log('No desea eliminar');
      }
    })
  }

  async lanzarVotacion(){

    await this.alertasService.alertaDecision('¿Desea dar comienzo a esta votación?').then( respuesta => {

      if(respuesta['data'] === true){

        var lanzamiento = new Date().getTime();
        this.acuerdoPublicado.fechaLanzada = lanzamiento;
        this.acuerdoPublicado.estado = 2;
        console.log(this.acuerdoPublicado);
        this.acuerdosService.eliminarAcuerdo(this.acuerdoPublicado);
        console.log(respuesta['data']);
      }else{

        console.log('No desea eliminar');
      }
    })
  }

  async terminar(){

    await this.alertasService.alertaDecision('¿Desea que se de termino a la votación?').then( respuesta => {

      if(respuesta['data'] === true){

        this.acuerdoPublicado.estado = 3;
        console.log(this.acuerdoPublicado);
        this.acuerdosService.eliminarAcuerdo(this.acuerdoPublicado);
        console.log(respuesta['data']);
      }else{

        console.log('No desea eliminar');
      }
    })
  }
}
