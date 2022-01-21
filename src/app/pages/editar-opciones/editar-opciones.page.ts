import { Component, OnInit, EventEmitter } from '@angular/core';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-editar-opciones',
  templateUrl: './editar-opciones.page.html',
  styleUrls: ['./editar-opciones.page.scss'],
})
export class EditarOpcionesPage implements OnInit {

  opciones : Object[] = [];
  titulos: string = '';
  res: string[] = [];
 // res = new EventEmitter<{}>();

  opcion: Object[]  = [{

    titulo:'',
    descripcion:'',
    votos: 0
  },
  {
    titulo:'',
    descripcion:'',
    votos: 0
  },
  {
    titulo:'',
    descripcion:'',
    votos: 0
  },
  {
    titulo:'',
    descripcion:'',
    votos: 0
  }];
  

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

      this.res = respuesta['opciones'];
        //console.log(respuesta);
        //console.log(this.res);
      var count = 0;
      console.log(this.res.length);

      for(let i = 0; i < this.res.length ; i++){

        this.opcion[i]['titulo'] = this.res[i]['titulo'];
        this.opcion[i]['descripcion'] = this.res[i]['descripcion'];
        count ++;
      }
   
      count = count - 3;
      this.agregarOpcion(count);

    }).unsubscribe();
  }

  agregarOpcion(count?: number){

    //var contador: number = count;

    if(count != null){
      //undefined
      this.contador = count;
    }
    
    this.contador++;

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

    console.log(this.contador);
    this.contador --;
    console.log(this.contador);

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

    this.opciones.push( this.opcion[0] );
    this.opciones.push( this.opcion[1] );

    if(this.contador >= 1){

      this.opciones.push( this.opcion[2] );
    }

    if(this.contador == 2){

      this.opciones.push( this.opcion[3] );
    }
    
    console.log(this.opciones);
   
    this.acuerdosService.enviarDatos(this.opciones, false);
    this.router.navigate(['/main/tabs/editar-acuerdo']);
    //this.navCtrl.navigateRoot('/main/tabs/editar-acuerdo');
    this.opciones = [];
    
  }

}
