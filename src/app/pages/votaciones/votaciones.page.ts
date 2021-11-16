import { Component, OnInit } from '@angular/core';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {

  acuerdos: Acuerdos[] = [];
  deshabilitar = false;

  constructor(private acuerdosService: AcuerdosService) { }

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

  refresh(event?){

    this.scroll(event, true);
    this.acuerdos = [];
    this.deshabilitar = false;
  }

}
