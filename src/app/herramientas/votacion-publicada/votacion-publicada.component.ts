import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';


@Component({
  selector: 'app-votacion-publicada',
  templateUrl: './votacion-publicada.component.html',
  styleUrls: ['./votacion-publicada.component.scss'],
})
export class VotacionPublicadaComponent implements OnInit {

  @Input() votacionPublicada: Acuerdos = {};

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }

  ngOnInit() {}


  abrirVotacion(){

    this.acuerdosService.enviarDatos(this.votacionPublicada);
    this.navCtrl.navigateRoot('/main/tabs/detalle-votacion');
  }

}
