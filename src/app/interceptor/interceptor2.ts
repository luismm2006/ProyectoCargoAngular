import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const interceptor2Interceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) { 
        localStorage.removeItem('token'); 
        router.navigate(['/login']);
      }

      if (error.status === 403) { 
        Swal.fire({ 
          icon: 'error', 
          title: 'Permisos insuficientes', 
          text: 'No tienes autorización para realizar esta acción.' 
        });
      }
      return throwError(() => error);
    })
  )
};
