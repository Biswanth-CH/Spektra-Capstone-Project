import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSupportComponent } from './legal-support.component';

describe('LegalSupportComponent', () => {
  let component: LegalSupportComponent;
  let fixture: ComponentFixture<LegalSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
