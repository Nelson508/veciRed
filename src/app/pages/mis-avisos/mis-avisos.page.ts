import { Avisos } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AvisoModalComponent } from 'src/app/herramientas/aviso-modal/aviso-modal.component';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-mis-avisos',
  templateUrl: './mis-avisos.page.html',
  styleUrls: ['./mis-avisos.page.scss'],
})
export class MisAvisosPage implements OnInit {

  misAvisos: Avisos[] = [];
  infiniteScroll= true;
  emptyMisAvisos=false;

  constructor( private AvisosService: AvisosService,
               private ruta: Router,
               private modalController: ModalController,
               private alertasService: AlertasService

  ) { }

  ngOnInit() {

    //actualizar la pagina si se elimino un aviso
    this.AvisosService.avisoEliminado.subscribe(
      aviso =>
      {
        this.misAvisos = [];
        this.refresher();
      }
    )
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
         //validacion para comprobar que no hay avisos, si no hay se manda mensaje a usuario
         if(respuesta.avisosPublicados.length == 0 && respuesta.pagina=== 1)
         {
           this.emptyMisAvisos=true;
 
         }else{
           this.emptyMisAvisos=false;
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

  refresher(event?)
  {
    this.misAvisos = []; 
    this.avisosPorUsuario(event, true);    
  }

  editarAviso(aviso)
  {
    //enviamos el aviso a traves del service
    this.AvisosService.enviarDatos(aviso);
    //redireccionamos al usuario a editar-aviso
    this.ruta.navigateByUrl('main/tabs/editar-aviso');
  }

  async eliminarAviso(aviso)
  {

    await this.alertasService.alertaDecision('Este aviso será eliminado permanentemente').then(
      respuesta =>
      {
        if(respuesta['data'] === true)
        {
          aviso.estadoAviso = 0;
          this.AvisosService.eliminarAviso(aviso);      
        }else{
          console.log('No desea eliminar');
        }
      }
    )



  }

  async openModal()
  {
    const modal = await this.modalController.create({
      component: AvisoModalComponent
    });

    await modal.present();
  }

  ionViewWillEnter() {
    this.misAvisos = [];
   this.refresher();
  }

  NavegarCrearAviso()
  {
    this.ruta.navigateByUrl('main/tabs/crear-aviso');
  }


}
