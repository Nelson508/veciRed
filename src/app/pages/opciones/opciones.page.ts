import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas.service';

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
              private navCtrl: NavController,
              private alertasService: AlertasService) { }

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

    const validado = this.validacion();

    if(validado == null){

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
  }

  validacion(){

    //Validación caracteres extraños en titulo de la opcipón 1
    var caracteresTitulo1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresTitulo1.test(this.opcion1.titulo) == false){
      
      return this.alertasService.alerta('Las opciones del acuerdo no permiten tener los caracteres ingresados.');
    }

    //Validación caracteres extraños en la descripción de la opcipón 1
    var caracteresDescripcion1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresDescripcion1.test(this.opcion1.descripcion) == false){
      
      return this.alertasService.alerta('Las descripciones de las opciones del acuerdo no permiten tener los caracteres ingresados.');
    }

    //Validación caracteres extraños en titulo de la opcipón 2
    var caracteresTitulo1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresTitulo1.test(this.opcion2.titulo) == false){
      
      return this.alertasService.alerta('Las opciones del acuerdo no permiten tener los caracteres ingresados.');
    }

    //Validación caracteres extraños en la descripción de la opcipón 2
    var caracteresDescripcion1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

    if(caracteresDescripcion1.test(this.opcion2.descripcion) == false){
      
      return this.alertasService.alerta('Las descripciones de las opciones del acuerdo no permiten tener los caracteres ingresados.');
    }

    if(this.contador >= 1){
      //Validación caracteres extraños en titulo de la opcipón 3
      var caracteresTitulo1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

      if(caracteresTitulo1.test(this.opcion3.titulo) == false){
        
        return this.alertasService.alerta('Las opciones del acuerdo no permiten tener los caracteres ingresados.');
      }

      //Validación caracteres extraños en la descripción de la opcipón 3
      var caracteresDescripcion1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

      if(caracteresDescripcion1.test(this.opcion3.descripcion) == false){
        
        return this.alertasService.alerta('Las descripciones de las opciones del acuerdo no permiten tener los caracteres ingresados.');
      }

    }

    if(this.contador == 2){
      //Validación caracteres extraños en titulo de la opcipón 4
      var caracteresTitulo1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

      if(caracteresTitulo1.test(this.opcion4.titulo) == false){
        
        return this.alertasService.alerta('Las opciones del acuerdo no permiten tener los caracteres ingresados.');
      }

      //Validación caracteres extraños en la descripción de la opcipón 4
      var caracteresDescripcion1 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!¿?\-.,()=/@ ]{1,30})+$/g;

      if(caracteresDescripcion1.test(this.opcion4.descripcion) == false){
        
        return this.alertasService.alerta('Las descripciones de las opciones del acuerdo no permiten tener los caracteres ingresados.');
      }
    }
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
