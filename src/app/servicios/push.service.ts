import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import OneSignal from 'onesignal-cordova-plugin';
import { Router } from '@angular/router';
import { OSNotification } from 'onesignal-cordova-plugin/types/Notification';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: OSNotification[] = [];

  userId: string;
  //Se crea un observable para las nuevas notificaciones
  pushListener =  new EventEmitter<OSNotification>();

  constructor(private storage: Storage,
              private router: Router,
              private usuarioService: UsuarioService) { 
                this.cargarMensajes();
              }

  
  
  OneSignalInit(){

    OneSignal.setAppId("971b279e-dd53-47c9-9c33-286653e8243d");

    console.log('noti: 29');
    
    OneSignal.setNotificationWillShowInForegroundHandler(async (notificacion) => {
      console.log('noti: 29');
      await this.notificacionRecibida(notificacion.getNotification());
     
      //La notificacion llega de inmediato
      notificacion.complete(notificacion.getNotification());
      
    });

    OneSignal.setNotificationOpenedHandler(async (notificacion) => {
      var noti = JSON.stringify(notificacion.notification);

      console.log('notificationOpenedCallback: ' + JSON.parse(noti));
      await this.notificacionRecibida(notificacion.notification);
      this.router.navigate(['/main/tabs/tab2']);
      
    });

    //Obtener ID del suscriptor
    OneSignal.getDeviceState((stateChanges) => {
      console.log('OneSignal getDeviceState: ' + JSON.stringify(stateChanges));
      this.userId = stateChanges.userId;
      console.log('PLayer ID: ' + this.userId);

    });

    /* var comunidades = this.usuarioService.obtenerArrayComunidadesUsuario();

    console.log(comunidades);

    OneSignal.setExternalUserId(JSON.stringify(comunidades)); */

  }

  async notificacionRecibida(notificacion: OSNotification){

    //Se asegura que los mensajes estén cargados
    await this.cargarMensajes();

    const  existePush = this.mensajes.find( mensaje => mensaje.notificationId === notificacion.notificationId);
    
    if(existePush){
      return;
    }

    //Se guarda la notificación en el array de mensajes
    this.mensajes.unshift(notificacion);
    //Cada vez que se reciba una notificación el observable va a emitir la nueva notificación
    this.pushListener.emit(notificacion);

    await this.guardarMensajes();
  }

  guardarMensajes(){

    this.storage.set('mensajes', this.mensajes);
  }

  //Se cargan los mensajes desde storage
  async cargarMensajes(){

    this.mensajes = await this.storage.get('mensajes') || [];
    return this.mensajes;
  }

  //Se cargan los mensajes
  async getMensajes(){

    await this.cargarMensajes();
    return [...this.mensajes];
  }

  //Borrar los mensajes
  async borrarMensajes(){
    await this.storage.clear();
    //this.storage.remove('mensajes');
    this.mensajes = [];
    this.guardarMensajes();

  }
}
