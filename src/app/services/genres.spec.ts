import { TestBed } from '@angular/core/testing';

import { Genres } from './genres';

describe('Genres', () => {
  let service: Genres;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Genres);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
