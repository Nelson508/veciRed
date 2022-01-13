import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OSNotification } from 'onesignal-cordova-plugin/types/Notification';
import { PushService } from '../../servicios/push.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  mensajes: OSNotification[] = [];

  constructor(private pushService: PushService,
              private applicationRef: ApplicationRef) {}

  ngOnInit() {

      //Se subscribe al puchListener para insertar las nuevas notificaciones
      this.pushService.pushListener.subscribe( noti => {
        this.mensajes.unshift(noti);
        //Reinicia el ciclo de detección de cambios en angular al agregar la variable al arreglo
        this.applicationRef.tick();
      });
  }

  //Se ejecuta cada vez que esta página es cargada
  async ionViewWillEnter(){

    console.log('Will Enter - Cargar mensajes');

    //Se cargan los mensajes desde el servicio 
    this.mensajes = await this.pushService.getMensajes();
  }

  async borrarMensajes(){
    await this.pushService.borrarMensajes();
    this.mensajes = [];
  }

}
