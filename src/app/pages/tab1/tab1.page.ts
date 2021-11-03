import { Component, OnInit  } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';
import { Avisos } from '../../interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  avisos: Avisos[] = [];
  emptyAvisos=false;

  constructor( private AvisosService: AvisosService,
               private menuCtrl: MenuController,
               private ruta: Router
               ) {
                this.menuCtrl.enable(true, 'first');
               }

  ngOnInit()
  {
    this.AvisosService.obtenerAvisos().subscribe( respuesta =>
      {
        
        this.avisos.push(...respuesta.avisosPublicados);
        if(respuesta.avisosPublicados.length == 0)
        {
          this.emptyAvisos=true;

        }
        
      })
      
      
  }

  NavegarCrearAviso()
  {

    this.ruta.navigateByUrl('crear-aviso');
  }

}
