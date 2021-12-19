import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';
import { SolicitudService } from '../../servicios/solicitud.service';
import { AlertasService } from '../../servicios/alertas.service';

@Component({
  selector: 'app-buscar-com',
  templateUrl: './buscar-com.page.html',
  styleUrls: ['./buscar-com.page.scss'],
})
export class BuscarComPage implements OnInit {

  //objeto que nos guarda los valores del buscador
  comunidad = {
    nombreComunidad: '',
    region: '',
    comuna: ''
  }
  //array objeto que nos muestra el conjunto de comunidades que cumplan con la busqueda
  comunidades: Comunidad[] = [];
  //variable que se hace true y muestra img en pantalla
  noComunity = false;

  mostrarInputMensaje = false;
  //objeto que contiene la id de la comunidad y el mensaje de solicitud a registrar
  solicitud = {
    _id: '',
    mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
  }
  //variable que nos guarda la posicion de la comunidad a enviar
  position;
  //array que nos guarda las com... para compararlas y verificar que usuario no pertenece
  arrayComunidades = [];

  perteneceUser = false;

  constructor(private comunidadService: ComunidadService,
              private solicitudService: SolicitudService,
              private alertasService: AlertasService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.obtenerComunidadesUsuario();
    
    this.solicitudService.nuevaSolicitud.subscribe(
      async respuesta =>
      {
        if(respuesta['ok'] === true)
        {
          await this.alertasService.alerta('¡Su solicitud ha sido enviada!');
          return;
        }else{
          await this.alertasService.alerta('¡Ya has enviado una solicitud a esta comunidad!');
          return;
        }
      }
    );
  }

  async buscar()
  {
    //console.log(this.comunidad.nombreComunidad + this.comunidad.region +' '+ this.comunidad.comuna);
    await this.comunidadService.filtrarComunidad(this.comunidad).subscribe(
      respuesta =>
      {
          this.comunidad = {
          nombreComunidad: '',
          region: '',
          comuna: ''
        }
        this.comunidades = [];
        this.noComunity = false;
        this.solicitud = {
          _id: '',
          mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
        };

        this.mostrarInputMensaje = false;
        this.position = null;
        
        
        this.comunidades.push(...respuesta['comunidades']);
        //respuesta para busqueda no exitosa
        if(respuesta['comunidades'].length < 1)
        {
          this.noComunity = true;
        }
        
      }
    )
    
    
  }

  //al cargar la pagina vaciaremos todas las variables
  ionViewWillEnter()
  {
    this.comunidades = [];
    this.noComunity = false;
    this.comunidad = {
      nombreComunidad: '',
      region: '',
      comuna: ''
    }
    this.solicitud = {
      _id: '',
      mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
    }

    this.mostrarInputMensaje = false;
    this.position = null;
    //this.arrayComunidades = [];
    this.obtenerComunidadesUsuario();
    
  }


  unirme(indexOfelement)
  {
    this.solicitud = {
      _id: '',
      mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
    };
    this.position = indexOfelement;
    this.mostrarInputMensaje = true;
   
  }

    async enviarSolicitud(comunity)
  {
    //validacion para comprobar que usuario no pertenece
    /*enviamos desde el *ngFor a comunity._id variable que almacena la id del usuario y luego la evaluamos en el array
    del usuario para verificar si existe alguna coincidencia*/
    
    this.solicitud._id = comunity._id;

    let index = this.arrayComunidades.indexOf(this.solicitud._id);
    if(index != -1)
    {
      this.alertasService.alerta('¡Ya perteneces a esta comunidad!');
      return;    
    }
    
    //INICIO ENVIO DE DATOS
    this.solicitudService.crearSolicitud(this.solicitud);
    // await this.solicitudService.nuevaSolicitud.subscribe(
    //   async respuesta =>
    //   {
    //     if(respuesta['ok'] === true)
    //     {
    //       await this.alertasService.alerta('¡Su solicitud ha sido enviada!');
    //       return;
    //     }else{
    //       await this.alertasService.alerta('¡Ya has enviado una solicitud a esta comunidad!');
    //       return;
    //     }
    //   }
    // );
    //FIN ENVIO DE DATOS

  }

   async obtenerComunidadesUsuario()
  {
    await this.usuarioService.obtenerArrayComunidadesUsuario().subscribe(
       async respuesta =>
      {
        this.arrayComunidades = await respuesta['comunidades']['comunidad']; 
      }
    )

  }

}
