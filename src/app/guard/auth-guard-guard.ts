import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/Service/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);

  if(service.user()){
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
