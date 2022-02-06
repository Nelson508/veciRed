import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { EditarAvisoPage } from './editar-aviso.page';

describe('EditarAvisoPage', () => {
  let component: EditarAvisoPage;
  let fixture: ComponentFixture<EditarAvisoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage, FileTransfer, Camera],
      declarations: [ EditarAvisoPage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Verdadero si no viene el Titulo || Titulo.length <= 2', () => {
    component.avisoEdicion.titulo = ''
    component.avisoEdicion.descripcion= 'Aviso testing'
    component.avisoEdicion.tipoAviso = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.editarAviso').disabled).toBeTruthy();
   });

   it('Verdadero si no viene el Descripcion || Descripcion.length <= 2', () => {
    component.avisoEdicion.titulo = 'aviso title'
    component.avisoEdicion.descripcion= ''
    component.avisoEdicion.tipoAviso = 3;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.editarAviso').disabled).toBeTruthy();
   });

   it('Verdadero si no viene el tipo Aviso', () => {
    component.avisoEdicion.titulo = 'aviso title'
    component.avisoEdicion.descripcion= 'aviso unit testing'
    component.avisoEdicion.tipoAviso = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.editarAviso').disabled).toBeTruthy();
   });

   it('Falso si titulo tiene caracteres especiales', () => {
    //component.avisoEdicion.titulo = '<h3>aviso title</h3>'
    component.avisoEdicion.titulo = 'aviso title'
    component.avisoEdicion.descripcion= 'aviso unit testing'
    component.avisoEdicion.tipoAviso = 5;
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Falso si Descripcion tiene caracteres especiales', () => {
    component.avisoEdicion.titulo = 'aviso title'
    component.avisoEdicion.descripcion= 'aviso unit testing'
    //component.avisoEdicion.descripcion= '<h3>aviso unit testing</h3>'
    component.avisoEdicion.tipoAviso = 5;
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   it('Verdadero si todos los campos estan completos', () => {
    component.avisoEdicion.titulo = 'aviso title'
    component.avisoEdicion.descripcion= 'aviso unit testing'
    component.avisoEdicion.tipoAviso = 5;
    var resultado = component.validacion();
    fixture.detectChanges();
    expect(resultado).toEqual(null);
   });

   

   
});
