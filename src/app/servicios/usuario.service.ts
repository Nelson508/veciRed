import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userToken: string = null;
  usuario: Usuario = {}; 

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController) { 

                this.storage.create();
               }

  login(email: string, password: string){

    const datos =  {email, password};

    return new Promise( resolve => {

      this.http.post(`${URL}/usuario/login`, datos)
        .subscribe(async resp => {
          console.log(resp);
  
          if(resp['ok']){
            await this.almacenarToken(resp['token']);
            resolve(true);
          }else{
            this.userToken = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });

  }

  logout(){

    this.userToken = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated:true});
  }

  registro( usuario: Usuario){

    return new Promise(resolve => {

      this.http.post(`${URL}/usuario/crear`, usuario)
        .subscribe(async resp => {
          console.log(resp);

          if(resp['ok']){
            await this.almacenarToken(resp['token']);
            resolve(true);
          }else{
            this.userToken = null;
            this.storage.clear();
            resolve(false);
          }

        });
    });
  }

  async almacenarToken(token: string){

    this.userToken = token;
    await this.storage.set('token', token);

    await this.verificaToken();
  }

  //Carga el Token desde el Storage
  async cargarStorageToken(){

    this.userToken = await this.storage.get('token') || null;

  }


  async verificaToken(): Promise<boolean>{

    await this.cargarStorageToken();

    if(!this.userToken){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve =>{
      const headers = new HttpHeaders({
        'Utoken': this.userToken
      });

      this.http.get(`${URL}/usuario/`, {headers})
        .subscribe(resp => {

          if(resp['ok']){
            this.usuario = resp['usuario'];
            resolve(true);
          }else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });


    });
  }
  //obtenemos la informacion del usuario para filtrar por rol en
  //crear avisos y editar avisos
  obtenerRolUsuario()
  {
    return this.usuario;
  }

  obtenerComunidadUsuario()
  {
    const headers = new HttpHeaders({
      'Utoken': this.userToken
    });

    return this.http.get<Usuario>(`${URL}/usuario/comunidad`, {headers});

  }


  actualizarToken(data)
  {
    

    return new Promise<boolean>( resolve =>
      {
        this.http.post(`${URL}/usuario/updateToken`, data)
        .subscribe( async respuesta =>
          {
            
            console.log(respuesta);
            if(respuesta['ok'])
            {
              await this.almacenarToken(respuesta['token']);
              resolve(true);
            }else{
              console.log('fallo');
              resolve(false);
              
            }
          })

      })



  }
}
