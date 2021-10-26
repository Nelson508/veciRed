import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AvisosCreados } from '../interfaces/interfaces';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  contadorPagina= 0;
  //inyectamos el Http para poder hacer nuestra peticion de los avisos
  constructor( private http: HttpClient ) { }


  obtenerAvisos()
  {
    this.contadorPagina++;
    return this.http.get<AvisosCreados>(`${url}/avisos/?pagina=${this.contadorPagina}`);
  }


}
