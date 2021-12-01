import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comunidad } from '../interfaces/interfaces';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  nuevaComunidad = new EventEmitter<Comunidad>();

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
}
