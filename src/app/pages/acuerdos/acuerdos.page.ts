import { Component, OnInit } from '@angular/core';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-acuerdos',
  templateUrl: './acuerdos.page.html',
  styleUrls: ['./acuerdos.page.scss'],
})
export class AcuerdosPage implements OnInit {

  acuerdos: Acuerdos[] = [];
  deshabilitar = false;

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl :NavController) { }

  ngOnInit() {

    this.scroll();

    this.acuerdosService.nuevoAcuerdo
        .subscribe( acuerdo => {

          this.acuerdos.unshift(acuerdo);
        });
  }

  scroll(event?, pull: boolean = false){

    this.acuerdosService.getAcuerdos(pull)
      .subscribe(response => {
        console.log(response );
        this.acuerdos.push(...response.acuerdosPublicados);

        if(event)
        {
          event.target.complete();

          if(response.acuerdosPublicados.length===0){
            this.deshabilitar = true;
          }
          
        }
      });
  }
  
  /* crearAcuerdo()
  {

    this.navCtrl.navigateRoot('/main/tabs/crear-acuerdo', {animated:true});
  } */

  refresh(event?){

    this.scroll(event, true);
    this.acuerdos = [];
    this.deshabilitar = false;
  }

}
