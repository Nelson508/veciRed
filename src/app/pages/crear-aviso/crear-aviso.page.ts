import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {
  aviso = {
    titulo: '',
    descripcion: '',
    tipoAviso: Number
  };
 

  constructor() {
    
   }

  ngOnInit() {
  }

}
