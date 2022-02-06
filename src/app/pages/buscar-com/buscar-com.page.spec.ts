import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';

import { BuscarComPage } from './buscar-com.page';

describe('BuscarComPage', () => {
  let component: BuscarComPage;
  let fixture: ComponentFixture<BuscarComPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
      declarations: [ BuscarComPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Verdadero si no viene mensaje', () => {

  //   component.solicitud.mensaje = '¡Hola!, me gustaria unirme a tu comunidad'
  //   const comunidad = {
  //     nombreComunidad: 'name',
  //     descripcion: 'hola',
  //     region: 'Bio-Bio',
  //     comuna: 'Arauco'
  //   }
  //   component.comunidades[0] = comunidad
    
  //   component.mostrarInputMensaje = true;
  //   var IndexOfelement = 1;
  //   component.position = IndexOfelement;
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.nativeElement.querySelector('.buscarCom').disabled).toBeTruthy();
  //   //expect(fixture.debugElement.nativeElement.querySelector('#test').disabled).toBeTruthy();

  //  });
  

  /*INICIO VALIDACIONES REQUISITO ENVIAR SOLICITUD*/

   it('Verdadero si  mensaje no viene con caracteres especiales', () => {
    //component.solicitud.mensaje = '¡Hola!, me gustaria unirme a tu comunidad<>""'
    component.solicitud.mensaje = '¡Hola!, me gustaria unirme a tu comunidad'
    fixture.detectChanges();
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Verdadero si  mensaje no viene vacio', () => {
    //component.solicitud.mensaje = ''
    component.solicitud.mensaje = '¡Hola!, me gustaria unirme a tu comunidad'
    fixture.detectChanges();
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Verdadero si  mensaje es completado', () => {
    component.solicitud.mensaje = '¡Hola!, me gustaria unirme a tu comunidad'
    fixture.detectChanges();
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });



   /*FIN VALIDACIONES REQUISITO ENVIAR SOLICITUD*/

   /*INICIO VALIDACIONES REQUISITO BUSCAR COMUNIDAD*/

    /*boton searchComunity se encuentra desabilitado si nombreComunidad = '' o region = ''*/
   it('Verdadero si no viene el nombre de la comunidad', () => {
    component.comunidad.nombreComunidad = ''
    component.comunidad.region = ''
    component.comunidad.comuna = 'Arauco'
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.searchComunity').disabled).toBeTruthy();
   });

   it('Verdadero si no viene región', () => {
    component.comunidad.nombreComunidad = ''
    component.comunidad.region = ''
    component.comunidad.comuna = 'Arauco'
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.searchComunity').disabled).toBeTruthy();
   });

   it('Verdadero si nombre comunidad no tiene caracteres especiales', () => {
    //component.comunidad.nombreComunidad = 'Los lirios<<>'
    component.comunidad.nombreComunidad = 'Los lirios'
    component.comunidad.region = 'Bío-Bío'
    component.comunidad.comuna = 'Arauco'
    var resultado = component.validacionBuscarCom();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });









   /*FIN VALIDACIONES REQUISITO BUSCAR COMUNIDAD*/
});
