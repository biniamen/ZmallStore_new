import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      // Add authorization header with token
      const authToken = localStorage.getItem('user');
      if (authToken) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        });
        return next.handle(authReq);
      } else {
        return next.handle(req);
      }
    }
  }
