import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  constructor( private http: HttpClient
    
             ) { }


  crearComunidad(comunidad)
  {
    return new Promise( resolve =>
      {
        this.http.post(`${url}/comunidad/crear`, comunidad).subscribe(
          respuesta =>
          {
            resolve(true);
          }
        )
      });


  }
}
