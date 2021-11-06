import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcuerdoPublicadoComponent } from './acuerdo-publicado.component';

describe('AcuerdoPublicadoComponent', () => {
  let component: AcuerdoPublicadoComponent;
  let fixture: ComponentFixture<AcuerdoPublicadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcuerdoPublicadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcuerdoPublicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
