import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommiteeHomeComponent } from './commitee-home.component';

describe('CommiteeHomeComponent', () => {
  let component: CommiteeHomeComponent;
  let fixture: ComponentFixture<CommiteeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommiteeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommiteeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
