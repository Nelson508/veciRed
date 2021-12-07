import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  nuevaSolicitud = new EventEmitter();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService
    ) { }


  //crear una nueva solicitud
  crearSolicitud(solicitud)
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })

    return new Promise(resolve =>
      {
        this.http.post(`${url}/solicitud/crear`, solicitud, {headers})
        .subscribe(respuesta =>
          {
            this.nuevaSolicitud.emit(respuesta['solicitudBD']);
            resolve(true);
          })
      }
      )


  }
}
