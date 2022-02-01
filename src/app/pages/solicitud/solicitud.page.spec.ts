import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';

import { SolicitudPage } from './solicitud.page';

describe('SolicitudPage', () => {
  let component: SolicitudPage;
  let fixture: ComponentFixture<SolicitudPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [Storage],
      declarations: [ SolicitudPage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
