import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage) { }

  login(correo: string, pass: string){

    const datos =  {correo, pass};

    this.http.post(`${URL}/usuario/login`, datos)
      .subscribe( resp => {
        console.log(resp);
      });
  }
}
