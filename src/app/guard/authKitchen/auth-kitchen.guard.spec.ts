import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authKitchenGuard } from './auth-kitchen.guard';

describe('authKitchenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authKitchenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
