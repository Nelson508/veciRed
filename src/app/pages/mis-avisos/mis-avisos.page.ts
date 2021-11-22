import { Avisos } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';

@Component({
  selector: 'app-mis-avisos',
  templateUrl: './mis-avisos.page.html',
  styleUrls: ['./mis-avisos.page.scss'],
})
export class MisAvisosPage implements OnInit {

  misAvisos: Avisos[] = [];
  infiniteScroll= true;
  emptyAvisos=false;

  constructor( private AvisosService: AvisosService

  ) { }

  ngOnInit() {
    this.avisosPorUsuario(true);
  }

  avisosPorUsuario(event?, pull: boolean = false)
  {

    if(pull)
    {
      this.misAvisos = [];
      this.infiniteScroll= true;
    }
    this.AvisosService.obtenerAvisosUsuario(pull).subscribe( respuesta =>
      {
        this.misAvisos.push(...respuesta.avisosPublicados);
        console.log(respuesta);
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
            //cuando ya no hay mas avisos desabilitamos el pull to refresh
            //pero cuando se llama al ion-refresher lo volvemos a habilitar
            this.infiniteScroll= false;
          }
        }
      })

  }

  refresher(event)
  {
    this.avisosPorUsuario(event, true);

    
  }

  editarAviso()
  {
    console.log('click');
  }

  eliminarAviso()
  {
    console.log('click');

  }

}
