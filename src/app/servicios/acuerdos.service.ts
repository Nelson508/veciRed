import { HttpClient, HttpHeaders} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { AcuerdosCreados, Acuerdos } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AcuerdosService {

  pagiaAcuerdos = 0;
  nuevoAcuerdo = new EventEmitter<Acuerdos>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  getAcuerdos(pull: boolean = false){

    if(pull){
      this.pagiaAcuerdos = 0;
    }

    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    this.pagiaAcuerdos++;

    return this.http.get<AcuerdosCreados>(`${URL}/acuerdos/?pagina=${this.pagiaAcuerdos}`, {headers});
  }

  crearAcuerdo(acuerdo){

    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    return new Promise( resolve => {

      this.http.post(`${URL}/acuerdos`, acuerdo, {headers})
          .subscribe(response => {
            
            this.nuevoAcuerdo.emit(response['acuerdo']);
            resolve(true);
          });
    });

  }
}
