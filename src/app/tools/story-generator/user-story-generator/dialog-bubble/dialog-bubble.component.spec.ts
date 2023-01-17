import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBubbleComponent } from './dialog-bubble.component';

describe('DialogBubbleComponent', () => {
  let component: DialogBubbleComponent;
  let fixture: ComponentFixture<DialogBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBubbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
