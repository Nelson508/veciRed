import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';

import { EditarComPage } from './editar-com.page';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('EditarComPage', () => {
  let component: EditarComPage;
  let fixture: ComponentFixture<EditarComPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
      declarations: [ EditarComPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ', () => {
    fixture = TestBed.createComponent(EditarComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let nombreComunidad = component.comunidadEditada.nombreComunidad;
    let descripcion = component.comunidadEditada.descripcion;
    let region = component.comunidadEditada.region;
    let comuna = component.comunidadEditada.comuna;
    
    
    nombreComunidad = 'hola';
    descripcion = 'sdfgsdfg';
    region = 'Bío-Bío';
    comuna = 'Arauco';

    const btnElement = fixture.debugElement.query(By.css('button.sendData'));
    btnElement.nativeElement.click();


    expect(btnElement).toBeTruthy();
  });
});
