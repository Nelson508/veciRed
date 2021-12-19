import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comunidad } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { UsuarioService } from './usuario.service';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  nuevaComunidad = new EventEmitter<Comunidad>();

  Objeto = new BehaviorSubject<{}>({});

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService
    
             ) { }


  crearComunidad(comunidad)
  {
    return new Promise( resolve =>
      {
        this.http.post(`${url}/comunidad/crear`, comunidad).subscribe(
          respuesta =>
          {
            console.log(respuesta);
            this.nuevaComunidad.emit(respuesta)
            resolve(true);
          }
        )
      });


  }


  enviarDatos(datos)
  {
    const aux = datos;
    this.Objeto.next(aux);
  }


  actualizarComunidad(comunidad)
  {
    return new Promise( resolve =>
      {
        this.http.post(`${url}/comunidad/actualizar`, comunidad).subscribe(
          respuesta =>
          {
            if(respuesta['ok'])
            {
              this.nuevaComunidad.emit(respuesta);
              resolve(true);
            }else{
              resolve(false);
            }
            
          }
        )

      })
  }


  filtrarComunidad(comunidad)
  {

    return this.http.post<Comunidad[]>(`${url}/comunidad/buscar`, comunidad);
   
    

  }

  obtenerNombreComunidad()
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    return this.http.get(`${url}/comunidad/nombreComunidad`,{headers});
    

  }
}
