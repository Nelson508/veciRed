import { Component, OnInit, ViewChild  } from '@angular/core';
import { AvisosService } from '../../servicios/avisos.service';
import { Avisos, Comunidad } from '../../interfaces/interfaces';
import { IonSelect, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';







@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{
  @ViewChild('sectionSelect', { static: false }) selectRef: IonSelect;

  //@ViewChild('sectionSelect') sectionSelect: Select;

  avisos: Avisos[] = [];
  emptyAvisos=false;
  infiniteScroll= true;
  Comunidad: Comunidad[] = [];
  Idcomunidad = '';
  contaRol = 0;
  Idusuario = '';

  constructor( private AvisosService: AvisosService,
               private menuCtrl: MenuController,
               private ruta: Router,
               private usuarioService: UsuarioService
               
               ) {
                this.menuCtrl.enable(true, 'first');
               }

  ngOnInit()
  {
    this.paginaSiguiente();

    this.AvisosService.nuevoAviso.subscribe(
      aviso =>
      {
        // cambiamos el valor de empty avisos a falso para que desaparesca el aviso vacio
        this.emptyAvisos=false;
        this.refresher();
      }
    );
  }
  //FIN NGONINIT

  //funcion que nos obtiene los post paginados 
  paginaSiguiente( event?, pull: boolean = false)
  {
    this.AvisosService.obtenerAvisos(pull).subscribe( respuesta =>
      {
        if(pull)
        {
          this.avisos = [];
          this.infiniteScroll= true;
        }
        
        this.avisos.push(...respuesta.avisosPublicados);
        //console.log(respuesta);
        //validacion para comprobar que no hay avisos, si no hay se manda mensaje a usuario
        if(respuesta.avisosPublicados.length == 0 && respuesta.pagina=== 1)
        {
          this.emptyAvisos=true;

        }

        if(event)
        {
          event.target.complete();

          if(respuesta.avisosPublicados.length == 0)
          {
            this.infiniteScroll= false;
          }
          
        }
        
      })
  }

  NavegarCrearAviso()
  {
    this.ruta.navigateByUrl('main/tabs/crear-aviso');
  }

  refresher(event?)
  {
    this.paginaSiguiente(event, true);
  }


  async actualizarToken()
  {   
    let aux = 0;
    /*Obtenemos la posicion de la Id seleccionada
    para obtener el rol y poder actualizar el token
    rol y comunidad comparten la misma posicion
    */
    this.Comunidad.forEach( 
      item =>
      {
        if(item._id == this.Idcomunidad)
        {
          this.contaRol = aux;        
        }else{
          aux++;         
        }             
      });
      let sendData = {
        usuario: this.Idusuario,
        posicion: this.contaRol
      }
      const tokenActualizado = await this.usuarioService.actualizarToken(sendData);
      if(tokenActualizado)
      {       
        this.emptyAvisos=false;
        this.Idusuario = '';
        this.contaRol = null;
        this.refresher();
      }
      else{
        console.log('fallo');
      }
    
    
  }
  //funcion que nos muestra el select oculto en el icono
  mostrarSelect()
  {
    this.obtenerComunidades();
    this.selectRef.open();
    this.Comunidad = []; 
  }

  obtenerComunidades()
  {
    this.usuarioService.obtenerComunidadUsuario().subscribe(
      respuesta =>
      {
        this.Idusuario = respuesta['comunidades']._id;
        this.Comunidad.push(...respuesta['comunidades']['comunidad']);    
      }
    )

  }
}
