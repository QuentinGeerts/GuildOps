import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);

  console.log('auth.accessToken() :>> ', auth.accessToken());

  const clone = auth.accessToken()
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.accessToken()}`,
        },
      })
    : req;

  return next(clone);
};
