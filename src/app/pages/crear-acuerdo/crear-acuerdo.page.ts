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
    fecha:''

  }

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  async crearAcuerdo(){

    console.log(this.acuerdo);
    const acuerdoCreado = await this.acuerdosService.crearAcuerdo(this.acuerdo);

    this.acuerdo = { 
      titulo:'',
      descripcion:'',
      fecha:''
    };

    this.navCtrl.navigateRoot('/main/tabs/acuerdos', {animated: true});
  }

}
