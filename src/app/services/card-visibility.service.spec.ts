import { TestBed } from '@angular/core/testing';

import { CardVisibilityService } from './card-visibility.service';

describe('CardVisibilityService', () => {
  let service: CardVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
