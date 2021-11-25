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
  emptyAcuerdos:boolean = false;
  deshabilitar: boolean = false;



  constructor(private acuerdosService: AcuerdosService,
              private navCtrl :NavController) { }

  ngOnInit() {

    //this.scroll();
    this.refresh();

    this.acuerdosService.nuevoAcuerdo
        .subscribe( acuerdo => {

          this.emptyAcuerdos=false;

          this.acuerdos.unshift(acuerdo);
        });

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
        this.acuerdos.push(...response.acuerdosPublicados);


        if(response.acuerdosPublicados.length == 0 && response.pagina === 1)
        {
          this.emptyAcuerdos=true;
          console.log(this.emptyAcuerdos );
        }
       

        if(event)
        {
          event.target.complete();

          if(response.acuerdosPublicados.length===0){
            this.deshabilitar = true;
          }
          
        }
      });



  }
  
  refresh(event?){

    this.scroll(event, true);
    this.acuerdos = [];
    this.deshabilitar = false;
  }

}
