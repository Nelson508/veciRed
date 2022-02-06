import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { CrearAvisoPage } from './crear-aviso.page';

describe('CrearAvisoPage', () => {
  let component: CrearAvisoPage;
  let fixture: ComponentFixture<CrearAvisoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage, FileTransfer, Camera],
      declarations: [ CrearAvisoPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verdadero si no viene el Titulo || Titulo.length <= 2', () => {
    component.aviso.titulo = 'ti'
    component.aviso.descripcion= 'Aviso testing'
    component.aviso.tipoAviso = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearAviso').disabled).toBeTruthy();
   });

   it('Verdadero si no viene el Descripción || Descripción.length <= 2', () => {
    component.aviso.titulo = 'unit testing title'
    component.aviso.descripcion= ''
    component.aviso.tipoAviso = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearAviso').disabled).toBeTruthy();
   });

   it('Verdadero si no viene el TipoAviso', () => {
    component.aviso.titulo = 'unit testing title'
    component.aviso.descripcion= 'unit testing description'
    component.aviso.tipoAviso = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearAviso').disabled).toBeTruthy();
   });

   it('Falso si titulo incluye caracteres especiales', () => {
    //component.aviso.titulo = '<h1>unit testing title</h1>'
    component.aviso.titulo = 'unit testing title'
    component.aviso.descripcion= 'unit testing description'
    component.aviso.tipoAviso = 5;
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Falso si Descripción incluye caracteres especiales', () => {
    component.aviso.titulo = 'unit testing title'
    //component.aviso.descripcion= '<h1>unit testing description</h1>'
    component.aviso.descripcion= 'unit testing description'
    component.aviso.tipoAviso = 5;
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Verdadero si todos los campos estan completados', () => {
    component.aviso.titulo = 'unit testing title'
    component.aviso.descripcion= 'unit testing description'
    component.aviso.tipoAviso = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.crearAviso').disabled).toBeFalsy();
   });


});
