import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterdetailComponent } from './enterdetail.component';

describe('EnterdetailComponent', () => {
  let component: EnterdetailComponent;
  let fixture: ComponentFixture<EnterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
