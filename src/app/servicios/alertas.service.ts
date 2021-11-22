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
    let choice;
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message,
      buttons: [
        {
         text: 'OK',
          handler: () => {

            alert.dismiss(true);
            return false;
          }
        },
        {
          text: 'Cancelar'
        }
    ]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data
    })
    return choice
  }
}
