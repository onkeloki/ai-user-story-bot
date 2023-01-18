import { TestBed } from '@angular/core/testing';

import { ButtonFactoryService } from './button-factory.service';

describe('ButtonFactoryService', () => {
  let service: ButtonFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
