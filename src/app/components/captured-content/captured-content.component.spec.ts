import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturedContentComponent } from './captured-content.component';

describe('CapturedContentComponent', () => {
  let component: CapturedContentComponent;
  let fixture: ComponentFixture<CapturedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturedContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
