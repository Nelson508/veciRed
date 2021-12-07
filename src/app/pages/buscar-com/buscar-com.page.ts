import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Comunidad } from '../../interfaces/interfaces';
import { ComunidadService } from '../../servicios/comunidad.service';
import { SolicitudService } from '../../servicios/solicitud.service';

@Component({
  selector: 'app-buscar-com',
  templateUrl: './buscar-com.page.html',
  styleUrls: ['./buscar-com.page.scss'],
})
export class BuscarComPage implements OnInit {

  comunidad = {
    nombreComunidad: '',
    region: '',
    comuna: ''
  }

  comunidades: Comunidad[] = [];

  noComunity = false;

  mostrarInputMensaje = false;

  solicitud = {
    _id: '',
    mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
  }

  position;

  constructor(private comunidadService: ComunidadService,
              private solicitudService: SolicitudService) { }

  ngOnInit() {
  }

  async buscar()
  {
    //console.log(this.comunidad.nombreComunidad + this.comunidad.region +' '+ this.comunidad.comuna);
    await this.comunidadService.filtrarComunidad(this.comunidad).subscribe(
      respuesta =>
      {
        this.comunidades = [];
        this.noComunity = false;
        this.solicitud = {
          _id: '',
          mensaje: '¡Hola!, me gustaria unirme a tu comunidad'
        };

        this.mostrarInputMensaje = false;
        this.position = null;
       
        console.log(respuesta);
        this.comunidades.push(...respuesta['comunidades']);
        //respuesta para busqueda no exitosa
        if(respuesta['comunidades'].length < 1)
        {
          console.log('entro')
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
  }


  unirme(indexOfelement)
  {
    this.position = indexOfelement;
    this.mostrarInputMensaje = true;
   
  }

  async enviarSolicitud(comunity)
  {
    this.solicitud._id = comunity._id;
    
    console.log(this.solicitud);
    this.solicitudService.crearSolicitud(this.solicitud);
    await this.solicitudService.nuevaSolicitud.subscribe(
      respuesta =>
      {
        console.log('subs')
        console.log(respuesta);
      }

    )

  }

}
