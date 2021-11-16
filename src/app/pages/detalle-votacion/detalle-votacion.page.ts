import { Component, OnInit } from '@angular/core';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';

@Component({
  selector: 'app-detalle-votacion',
  templateUrl: './detalle-votacion.page.html',
  styleUrls: ['./detalle-votacion.page.scss'],
})
export class DetalleVotacionPage implements OnInit {

  buttonValue = -1;

  votacion: Acuerdos = {

    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService) { }

  ngOnInit() {

    this.acuerdosService.Objeto.subscribe(respuesta =>{
  
      this.votacion = respuesta;
      console.log(this.votacion);
      console.log(this.votacion.opciones[0]['titulo']);
    });
  }

  mostrarInfo(){

  }

  votar(){

  }

  seleccionar(num){


    StyleSheet: "background-color: red";
  }

}
