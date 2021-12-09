import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrosAcuerdosPage } from './registros-acuerdos.page';

describe('RegistrosAcuerdosPage', () => {
  let component: RegistrosAcuerdosPage;
  let fixture: ComponentFixture<RegistrosAcuerdosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrosAcuerdosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrosAcuerdosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
