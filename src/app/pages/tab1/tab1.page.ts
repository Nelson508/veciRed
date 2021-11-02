import { Component, OnInit  } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';
import { Avisos } from '../../interfaces/interfaces';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  avisos: Avisos[] = [];

  constructor( private AvisosService: AvisosService,
               private menuCtrl: MenuController ) {}

  ngOnInit()
  {
    this.AvisosService.obtenerAvisos().subscribe( respuesta =>
      {
        console.log(respuesta.avisosPublicados[0].usuario.nombre);
        this.avisos.push(...respuesta.avisosPublicados);
      })
  }

  /* menu(){
    this.menuCtrl.open('first');

  } */

}
