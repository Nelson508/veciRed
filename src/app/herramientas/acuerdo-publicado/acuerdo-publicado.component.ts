import { Component, Input, OnInit } from '@angular/core';
import { Acuerdos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-acuerdo-publicado',
  templateUrl: './acuerdo-publicado.component.html',
  styleUrls: ['./acuerdo-publicado.component.scss'],
})
export class AcuerdoPublicadoComponent implements OnInit {

  @Input() acuerdoPublicado: Acuerdos = {};

  constructor() { }

  ngOnInit() {}

}
