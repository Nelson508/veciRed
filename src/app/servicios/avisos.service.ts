import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AvisosCreados } from '../interfaces/interfaces';


const url = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  TokenTemp="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjYxN2I2MmJiNzBiMWRkODkzNTY4MDRiMCIsIm5vbWJyZSI6Ikp1YW4gcGnDsWEiLCJlbWFpbCI6Ikp1YW5wacOxYTIyQGdtYWlsLmNvbSIsImltYWdlblBlcmZpbCI6InBlcmZpbC5wbmciLCJyb2wiOiIxIiwiY29tdW5pZGFkIjpbIjYxN2EzNjUxYjZjYzIzZTgyNDZiZTIzNiJdfSwiaWF0IjoxNjM1NDc2MTU1LCJleHAiOjE2NDQwMjk3NTV9.0gg5_VG6B6qmJHfBZAzYkAhL8o5UrzE0KRux2rJXz2A";
  contadorPagina= 0;
  //inyectamos el Http para poder hacer nuestra peticion de los avisos
  constructor( private http: HttpClient ) { }

  
  obtenerAvisos()
  {
    const headers = new HttpHeaders({
      'UToken': this.TokenTemp
    })
    this.contadorPagina++;
    return this.http.get<AvisosCreados>(`${url}/avisos/?pagina=${this.contadorPagina}`,{headers});
  }


}
