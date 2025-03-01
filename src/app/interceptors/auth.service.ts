import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  constructor(private authService:AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const token =this.authService.getToken();
    const token=localStorage.getItem('token');

    console.log('Intercepting request:', req.url);
    console.log('Token:', token);
    
    if(token){
      const cloned=req.clone({
        setHeaders:{
          Authorozation: `Bearer ${token}`
        }
      });
      console.log('Modified Request Headers:', cloned.headers);
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
