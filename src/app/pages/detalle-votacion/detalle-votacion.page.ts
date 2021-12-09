import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Acuerdos } from '../../interfaces/interfaces';
import { AcuerdosService } from '../../servicios/acuerdos.service';
import { CuentaRegresivaComponent } from '../../herramientas/cuenta-regresiva/cuenta-regresiva.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-votacion',
  templateUrl: './detalle-votacion.page.html',
  styleUrls: ['./detalle-votacion.page.scss'],
})
export class DetalleVotacionPage implements OnInit {
  
  @ViewChild(CuentaRegresivaComponent) child;
 
  private subscription: Subscription;

  buttonValue = -1;

  votacion: Acuerdos = {

    titulo:'',
    descripcion:'',
    fecha:null,
    hora:null,
    duracion:0,
    opciones: {}
  };

  constructor(private acuerdosService: AcuerdosService,
              private navCtrl: NavController) { }
              
              
  ngOnInit() {

    this.acuerdosService.Objeto.subscribe(respuesta =>{
  
      this.votacion = respuesta;
      console.log(this.votacion);
      console.log(this.votacion.opciones[0]['titulo']);
      //this.ionViewDidLoad();
    });
  }

  mostrarInfo(){
    
    this.acuerdosService.enviarDatos(this.votacion);
    this.navCtrl.navigateRoot('/main/tabs/info');

  }

  async votar(opcion){
    //A la opcion que se eligio se le suma un voto
    this.votacion.opciones[opcion]['votos']++;
    //Luego se actualzia la votacion(se envia el objeto que contiene elacuerdo con las opciones)
    const actualizado = await this.acuerdosService.actualizarAcuerdo(this.votacion);
    //Si la actualizacion ocurrio sin problemas se redirecciona a votaciones
    if(actualizado){
      //Mensaje actualizado
      this.navCtrl.navigateRoot('/main/tabs/votaciones', {animated: true});
    }else{
      //Mensaje error
      console.log('No se logra' + actualizado);

    }
  }
  
  ionViewWillEnter() {
    
    this.child.ngOnDestroy();
    this.child.ngOnInit();
  } 

  ionViewDidLeave() {
    
    this.child.ngOnDestroy();
  }
}
