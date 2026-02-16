import { HttpInterceptorFn } from '@angular/common/http';

export const interceptor1Interceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
