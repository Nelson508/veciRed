import { Avisos } from './../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AvisosCreados } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  //se crea un nuevo event emitter que enviara nuestro aviso recien creado al tab1
  nuevoAviso = new EventEmitter<Avisos>();
  contadorPagina= 0;
  //inyectamos el Http para poder hacer nuestra peticion de los avisos
  constructor( private http: HttpClient,
               private usuarioService: UsuarioService ) { }

  
  obtenerAvisos(pull: boolean = false)
  {
    if(pull)
    {
      this.contadorPagina= 0;
    }
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })
    this.contadorPagina++;
    return this.http.get<AvisosCreados>(`${url}/avisos/?pagina=${this.contadorPagina}`,{headers});
  }


  crearNuevoAviso(aviso)
  {
    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })

    return new Promise( resolve =>
      {
        this.http.post(`${url}/avisos`, aviso,{headers}).subscribe( respuesta =>
          {
            // console.log(respuesta);
            this.nuevoAviso.emit(respuesta['aviso']);
            resolve(true);
          })

      });

   


  }


}
