import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-editar-com',
  templateUrl: './editar-com.page.html',
  styleUrls: ['./editar-com.page.scss'],
})
export class EditarComPage implements OnInit {

  comunidadEditada: Comunidad = {
    nombreComunidad: '',
    descripcion: '',
    region: '',
    comuna: ''

  };
  
  constructor( private comunidadService: ComunidadService,
               private navController: NavController,
               private alertasService: AlertasService,
    
             ) { }

  ngOnInit()
  {
    this.obtenerComunidadEditar();
  }

  editarComunidad()
  {
    //Validación caracteres extraños en nombre
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,50})+$/g;
    var caracteres2 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,50})+$/g;
    if(caracteres.test(this.comunidadEditada.nombreComunidad) == false){
     this.alertasService.alerta('El Nombre de la comunidad no permite tener caracteres especiales');
     return;
   }

   if(caracteres2.test(this.comunidadEditada.descripcion) == false){
     this.alertasService.alerta('La descripción de la comunidad no permite tener caracteres especiales');
     return;
   }

    if(this.comunidadEditada.nombreComunidad.length > 25)
    {
      this.alertasService.alerta('Nombre demasiado largo');
      return;
    }

    if(this.comunidadEditada.descripcion.length > 250)
    {
      this.alertasService.alerta('Descripción demasiada larga');
      return;

    }
    const actualizado = this.comunidadService.actualizarComunidad(this.comunidadEditada);
    if(actualizado)
    {
        this.comunidadEditada = {
        nombreComunidad: '',
        descripcion: '',
        region: '',
        comuna: ''
    
      };
      this.navController.navigateRoot('/main/tabs/comunidad',{animated: true});
      this.alertasService.presentToast('Comunidad editada exitosamente'); 
    }else{
      console.log('fallo');
    }
  }

  async obtenerComunidadEditar()
  {
    await  this.comunidadService.Objeto.subscribe(
      async respuesta =>
      {
         this.comunidadEditada =  await respuesta;

      }
    )
  }

  ionViewWillEnter(){
    this.obtenerComunidadEditar();
  }

}
