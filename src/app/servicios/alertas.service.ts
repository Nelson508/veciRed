import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor( private alertController: AlertController) { }

  async alerta(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async alertaDecision(message: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK', 'Cancel']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  /* async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  } */
}
