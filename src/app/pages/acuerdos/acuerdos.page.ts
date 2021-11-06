import { Component, OnInit } from '@angular/core';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Acuerdos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-acuerdos',
  templateUrl: './acuerdos.page.html',
  styleUrls: ['./acuerdos.page.scss'],
})
export class AcuerdosPage implements OnInit {

  acuerdos: Acuerdos[] = []; 

  constructor(private acuerdosService: AcuerdosService) { }

  ngOnInit() {

    this.acuerdosService.getAcuerdos()
      .subscribe(response => {
        console.log(response );
        this.acuerdos.push(...response.acuerdosPublicados);
      });
  }

}
