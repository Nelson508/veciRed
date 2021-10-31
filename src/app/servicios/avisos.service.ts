import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AvisosCreados } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  
  contadorPagina= 0;
  //inyectamos el Http para poder hacer nuestra peticion de los avisos
  constructor( private http: HttpClient,
               private usuarioService: UsuarioService ) { }

  
  obtenerAvisos()
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })
    this.contadorPagina++;
    return this.http.get<AvisosCreados>(`${url}/avisos/?pagina=${this.contadorPagina}`,{headers});
  }


}
