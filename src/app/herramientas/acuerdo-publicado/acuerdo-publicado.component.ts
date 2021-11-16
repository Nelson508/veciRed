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

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController,
              private alertasService: AlertasService) { }

  ngOnInit() {}

  abrirEditar(){

    this.acuerdosService.enviarDatos(this.acuerdoPublicado, false);
    //this.router.navigate(['/main/tabs/crear-acuerdo']);
    this.navCtrl.navigateRoot('/main/tabs/crear-acuerdo');
  }

  async eliminar(){

    const resultado = await this.alertasService.alertaDecision('Desea eliminar este acuerdo');//.then( respuesta => {

     
      //if(respuesta['ok']){

        //this.acuerdoPublicado.estado = 0;
        //this.acuerdosService.eliminarAcuerdo(this.acuerdoPublicado);
        //console.log(respuesta);

        console.log(resultado);
     //}else{
        //console.log('No desea eliminar');
      //}
    //})
  }
}
