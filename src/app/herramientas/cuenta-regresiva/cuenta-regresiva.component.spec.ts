import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { CuentaRegresivaComponent } from './cuenta-regresiva.component';

describe('CuentaRegresivaComponent', () => {
  let component: CuentaRegresivaComponent;
  let fixture: ComponentFixture<CuentaRegresivaComponent>;

  beforeEach(waitForAsync(() => {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 0;
    TestBed.configureTestingModule({
      providers: [Storage, FileTransfer],
      declarations: [ CuentaRegresivaComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    
    fixture = TestBed.createComponent(CuentaRegresivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* beforeAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 0;
  }); */
});
