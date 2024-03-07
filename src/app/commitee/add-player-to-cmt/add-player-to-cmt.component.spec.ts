import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerToCmtComponent } from './add-player-to-cmt.component';

describe('AddPlayerToCmtComponent', () => {
  let component: AddPlayerToCmtComponent;
  let fixture: ComponentFixture<AddPlayerToCmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlayerToCmtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPlayerToCmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
