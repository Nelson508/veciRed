import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-aviso',
  templateUrl: './nuevo-aviso.component.html',
  styleUrls: ['./nuevo-aviso.component.scss'],
})
export class NuevoAvisoComponent implements OnInit {
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor() { }

  ngOnInit() {}

}
