import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comunidad } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  nuevaComunidad = new EventEmitter<Comunidad>();

  Objeto = new BehaviorSubject<{}>({});

  constructor( private http: HttpClient
    
             ) { }


  crearComunidad(comunidad)
  {
    return new Promise( resolve =>
      {
        this.http.post(`${url}/comunidad/crear`, comunidad).subscribe(
          respuesta =>
          {
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
}
