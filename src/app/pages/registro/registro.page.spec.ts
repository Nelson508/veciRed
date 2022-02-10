import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';
import { FormsModule, NgForm } from '@angular/forms';

import { RegistroPage } from './registro.page';
import { Usuario } from '../../interfaces/interfaces';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
      declarations: [ RegistroPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  //   expect(component).toBeDefined();
  //   expect(component).toBeInstanceOf(RegistroPage);
  //   expect(component.userRegistro.fechaNacimiento).toBe('');
  // });

  // /* it('Se redirige a login', () => {
  //   component.login();
  //   expect(component).toBeTruthy();
  // }); */

  // it('Se registra a un usuario', () => {
    
  //   component.registro();
  //   expect(component).toBeTruthy();
  // });





});
