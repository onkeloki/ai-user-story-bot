import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryGeneratorComponent } from './user-story-generator.component';

describe('UserStoryGeneratorComponent', () => {
  let component: UserStoryGeneratorComponent;
  let fixture: ComponentFixture<UserStoryGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStoryGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStoryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
