import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authColabGuard } from './auth-colab.guard';

describe('authColabGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authColabGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
