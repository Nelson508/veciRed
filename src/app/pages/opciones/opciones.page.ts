import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  opciones : Object[] = [];
  titulos: string = '';

  opcion1 = {
    titulo:'',
    descripcion:'',
    votos: 0
  };

  opcion2 = {
    titulo:'',
    descripcion:'',
    votos: 0
  };

  opcion3 = {
    titulo:'',
    descripcion:'',
    votos: 0
  };

  opcion4 = {
    titulo:'',
    descripcion:'',
    votos: 0
  };


  ocultarOpcion3 = true;
  ocultarOpcion4 = true;
  contador = 0;
  desactivarBotonAdd = false;
  desactivarBotonRemove = true;

  constructor(private acuerdosService: AcuerdosService,
              private router: Router,
              private navCtrl: NavController) { }

  ngOnInit() {
    
    this.acuerdosService.Objeto.subscribe(respuesta =>{

      console.log('la respuesta es: ' + respuesta);

      if(respuesta == true){

        console.log(respuesta);
        this.limpiar();
      }
    });
  }

  agregarOpcion(){
    
    this.contador ++;

    if(this.contador > 0){

      this.ocultarOpcion3 = false;
      this.desactivarBotonRemove = false;
    } 
    
    if(this.contador > 1){

      this.ocultarOpcion4 = false;
      this.desactivarBotonAdd = true;
    }

  }

  eliminarOpcion(){

    this.contador --;

    if(this.contador < 1){
      
      this.ocultarOpcion3 = true;
      this.desactivarBotonRemove = true;
    }
    
    if(this.contador < 2){

      this.ocultarOpcion4 = true;
      this.desactivarBotonAdd = false;
    }
  }

  enviarOpciones(){

    this.opciones.push( this.opcion1 );
    this.opciones.push( this.opcion2 );

    if(this.contador >= 1){

      this.opciones.push( this.opcion3 );
    }

    if(this.contador == 2){

      this.opciones.push( this.opcion4 );
    }
    
    console.log(this.opciones);
   
    this.acuerdosService.enviarDatos(this.opciones);
    this.router.navigate(['/main/tabs/crear-acuerdo']);
    //this.navCtrl.navigateRoot('/main/tabs/crear-acuerdo');
    this.opciones = [];
  
  }

  limpiar(){

    this.opcion1.titulo = '';
    this.opcion2.titulo = '';
    this.opcion3.titulo = '';
    this.opcion4.titulo = '';
    this.opcion1.descripcion = '';
    this.opcion2.descripcion = '';
    this.opcion3.descripcion = '';
    this.opcion4.descripcion = '';
  }

}
