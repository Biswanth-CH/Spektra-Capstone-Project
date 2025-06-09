import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportServicesComponent } from './passport-services.component';

describe('PassportServicesComponent', () => {
  let component: PassportServicesComponent;
  let fixture: ComponentFixture<PassportServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassportServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
