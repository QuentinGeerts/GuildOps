import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  console.log('route :>> ', route);
  console.log('state :>> ', state);

  return inject(AuthService).isLoggedIn()
    ? true
    : inject(Router).navigate(["login"]);
};
