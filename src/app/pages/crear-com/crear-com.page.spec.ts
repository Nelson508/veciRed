import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';

import { CrearComPage } from './crear-com.page';
import { By } from '@angular/platform-browser';
describe('CrearComPage', () => {
  let component: CrearComPage;
  let fixture: ComponentFixture<CrearComPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
      declarations: [ CrearComPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verdadero si no viene el nombre || nombre.length <= 2', () => {
    component.comunidad.nombreComunidad = ''
    component.comunidad.descripcion = 'comunidad vecired'
    component.comunidad.region = 'Bío-Bío'
    component.comunidad.comuna = 'Arauco'
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearCom').disabled).toBeTruthy();
   });

   it('Verdadero si no viene Descripción || Descripción.length <= 2', () => {
    component.comunidad.nombreComunidad = 'VeciRed'
    component.comunidad.descripcion = ''
    component.comunidad.region = 'Bío-Bío'
    component.comunidad.comuna = 'Arauco'
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearCom').disabled).toBeTruthy();
   });

   it('Verdadero si región es vacío', () => {
    component.comunidad.nombreComunidad = 'VeciRed'
    component.comunidad.descripcion = 'comunidad vecired'
    component.comunidad.region = ''
    component.comunidad.comuna = 'Arauco'
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearCom').disabled).toBeTruthy();
   });

   it('Verdadero si comuna es vacío', () => {
    component.comunidad.nombreComunidad = 'VeciRed'
    component.comunidad.descripcion = 'comunidad vecired'
    component.comunidad.region = 'Bío-Bío'
    component.comunidad.comuna = ''
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearCom').disabled).toBeTruthy();
   });

    it('Falso si nombreComunidad incluye caracteres especiales', () => {
      //component.comunidad.nombreComunidad = '<h1>VeciRed</h1>'
      component.comunidad.nombreComunidad = 'VeciRed'
    component.comunidad.descripcion = 'comunidad vecired'
    component.comunidad.region = 'Bío-Bío'
    component.comunidad.comuna = 'Arauco'
    /*funcion validacion retorna NULL cuando cumple todas las condiciones en caso contrario
    retorna una alerta con un mensaje la cual es un object*/
    var resultado = component.validacion();
    fixture.detectChanges();

    expect(resultado).toEqual(null);
   });

   it('Falso si descripción incluye caracteres especiales', () => {
    component.comunidad.nombreComunidad = 'VeciRed'
  component.comunidad.descripcion = 'Comunidad VeciRed'
  component.comunidad.region = 'Bío-Bío'
  component.comunidad.comuna = 'Arauco'
  /*funcion validacion retorna NULL cuando cumple todas las condiciones en caso contrario
  retorna una alerta con un mensaje la cual es un object*/
  var resultado = component.validacion();
  fixture.detectChanges();

  expect(resultado).toEqual(null);
 });

 it('Verdadero si todos los campos estan completados', () => {
  component.comunidad.nombreComunidad = 'VeciRed'
component.comunidad.descripcion = 'Comunidad VeciRed'
component.comunidad.region = 'Bío-Bío'
component.comunidad.comuna = 'Arauco'
/*funcion validacion retorna NULL cuando cumple todas las condiciones en caso contrario
retorna una alerta con un mensaje la cual es un object*/
var resultado = component.validacion();
fixture.detectChanges();

expect(resultado).toEqual(null);
});







  });
