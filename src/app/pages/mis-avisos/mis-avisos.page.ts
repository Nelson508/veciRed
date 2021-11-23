import { Avisos } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AvisoModalComponent } from 'src/app/herramientas/aviso-modal/aviso-modal.component';

@Component({
  selector: 'app-mis-avisos',
  templateUrl: './mis-avisos.page.html',
  styleUrls: ['./mis-avisos.page.scss'],
})
export class MisAvisosPage implements OnInit {

  misAvisos: Avisos[] = [];
  infiniteScroll= true;
  emptyAvisos=false;

  constructor( private AvisosService: AvisosService,
               private ruta: Router,
               private modalController: ModalController

  ) { }

  ngOnInit() {
    this.avisosPorUsuario();
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
 
         }else{
           this.emptyAvisos=false;
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

  editarAviso(aviso)
  {
    //console.log('click');
    console.log(aviso.titulo);
    console.log(aviso.descripcion);
    console.log(aviso.tipoAviso);
    //enviamos el aviso a traves del service
    this.AvisosService.enviarDatos(aviso);
    //redireccionamos al usuario a editar-aviso
    this.ruta.navigateByUrl('main/tabs/editar-aviso');
  }

  eliminarAviso()
  {
    console.log('click');

  }

  async openModal()
  {
    console.log('modal jeje');
    const modal = await this.modalController.create({
      component: AvisoModalComponent

    });

    await modal.present();
  }

  

}
