import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-acuerdo',
  templateUrl: './crear-acuerdo.page.html',
  styleUrls: ['./crear-acuerdo.page.scss'],
})
export class CrearAcuerdoPage implements OnInit {

  tempImages: string[] = [];

  acuerdo = {
    titulo:'',
    descripcion:'',
    fecha:''

  }

  constructor() { }

  ngOnInit() {
  }

  crearAcuerdo(){

    console.log(this.acuerdo);

  }

}
