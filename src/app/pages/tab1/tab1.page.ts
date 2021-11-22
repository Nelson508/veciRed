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
  infiniteScroll= true;

  constructor( private AvisosService: AvisosService,
               private menuCtrl: MenuController,
               private ruta: Router
               ) {
                this.menuCtrl.enable(true, 'first');
               }

  ngOnInit()
  {
    this.paginaSiguiente();

    this.AvisosService.nuevoAviso.subscribe(
      aviso =>
      {
        // cambiamos el valor de empty avisos a falso para que desaparesca el aviso vacio
        this.emptyAvisos=false;
        //a traves de unshift insertaremos el nuevo aviso en el tope de nuestro arreglo
        this.avisos.unshift(aviso);

      }
    );
    
      
      
  }
  //FIN NGONINIT

  
  //funcion que nos obtiene los post paginados 
  paginaSiguiente( event?, pull: boolean = false)
  {
    this.AvisosService.obtenerAvisos(pull).subscribe( respuesta =>
      {

        if(pull)
        {
          this.avisos = [];
          this.infiniteScroll= true;
        }
        
        this.avisos.push(...respuesta.avisosPublicados);
        //console.log(respuesta);
        //validacion para comprobar que no hay avisos, si no hay se manda mensaje a usuario
        if(respuesta.avisosPublicados.length == 0 && respuesta.pagina=== 1)
        {
          this.emptyAvisos=true;

        }

        if(event)
        {
          event.target.complete();

          if(respuesta.avisosPublicados.length == 0)
          {
            //event.target.disabled = true;
            this.infiniteScroll= false;
          }
          
        }
        
      })


  }

  NavegarCrearAviso()
  {

    this.ruta.navigateByUrl('main/tabs/crear-aviso');
  }

  refresher(event)
  {
    this.paginaSiguiente(event, true)


  }

}
