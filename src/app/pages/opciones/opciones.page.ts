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
    descripcion:''
  };

  opcion2 = {
    titulo:'',
    descripcion:''
  };

  opcion3 = {
    titulo:'',
    descripcion:''
  };

  opcion4 = {
    titulo:'',
    descripcion:''
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
    /* this.acuerdosService.Objeto.subscribe(respuesta =>{

      if(respuesta['tipo'] == false){

        var res = respuesta;
        
        this.opcion1.titulo = res[0]['titulo'];
        this.opcion2.titulo = res[1]['titulo'];
        this.opcion3.titulo = res[2]['titulo'];
        this.opcion4.titulo = res[3]['titulo'];
        this.opcion1.descripcion = res[0]['descripcion'];
        this.opcion2.descripcion = res[1]['descripcion'];
        this.opcion3.descripcion = res[2]['descripcion'];
        this.opcion4.descripcion = res[3]['descripcion'];
      }

    }); */
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

  /* ionViewWillEnter(){

    this.opcion1.titulo = '';
    this.opcion2.titulo = '';
    this.opcion3.titulo = '';
    this.opcion4.titulo = '';
    this.opcion1.descripcion = '';
    this.opcion2.descripcion = '';
    this.opcion3.descripcion = '';
    this.opcion4.descripcion = '';
  }
 */
}
