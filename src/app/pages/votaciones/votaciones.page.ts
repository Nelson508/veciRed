import { Component, OnInit } from '@angular/core';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {

  acuerdos: Acuerdos[] = [];
  deshabilitar = false;
  contador = 0;
  acuerdoLanzado: Acuerdos = {};


  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }

  ngOnInit() {

    //this.scroll();
    this.refresh();
    
    this.acuerdosService.acuerdoEliminado
        .subscribe( acuerdo => {

          //this.emptyAcuerdos=false;
          this.refresh();
          //this.acuerdos.unshift(acuerdo);
        });
  }

  scroll(event?, pull: boolean = false){

    this.acuerdosService.getAcuerdos(pull)
      .subscribe(response => {
        console.log(response );

        for (let index = 0; index < response.acuerdosPublicados.length; index++) {
          //const element = response.acuerdosPublicados[index];
          console.log(index);
          if(response.acuerdosPublicados[index]['estado'] == 2){
            this.acuerdoLanzado = response.acuerdosPublicados[index];
            //console.log(response.acuerdosPublicados[index]['estado']);
            //this.acuerdos.push(...response.acuerdosPublicados['estado']);
            this.acuerdos.push(this.acuerdoLanzado);
            //console.log(this.acuerdos);
          }

        }
        
        /* if(response.acuerdosPublicados[this.contador]['estado'] == 2){

          this.acuerdos.push(response.acuerdosPublicados[this.contador]);
        }
        console.log(this.acuerdos);
        this.contador++; */
       /*  console.log(response.acuerdosPublicados[0]);
        this.contador++;
        console.log(response.acuerdosPublicados[1]);
 */
        if(event)
        {
          event.target.complete();

          if(response.acuerdosPublicados.length===0){
            this.deshabilitar = true;
          }
          
        }
      });
  }

  msotrarRegistro(){

    this.navCtrl.navigateRoot('/main/tabs/registros-acuerdos');
  }


  refresh(event?){

    this.scroll(event, true);
    this.acuerdos = [];
    this.deshabilitar = false;
  }

}
