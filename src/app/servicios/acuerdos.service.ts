import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { AcuerdosCreados } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AcuerdosService {

  pagiaAcuerdos = 0;

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  getAcuerdos(pull: boolean = false){

    if(pull){
      this.pagiaAcuerdos = 0;
    }

    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    })

    this.pagiaAcuerdos++;

    return this.http.get<AcuerdosCreados>(`${URL}/acuerdos/?pagina=${this.pagiaAcuerdos}`, {headers});
  }
}
