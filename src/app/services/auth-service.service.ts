import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface LoginRequest{
  email : string;
  password: string;
}

interface LoginResponse{
  email : string;
  password: string;
  token : string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl=environment.apiBaseUrl+'/login';
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());

  username$ = this.usernameSubject.asObservable();
  
  constructor(private http:HttpClient,private router: Router) {}

  login(credentials:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/login`,credentials);
  }

  saveToken(token:string,email: string){
     localStorage.setItem('token',token);
     localStorage.setItem('userId',email);

  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  getUsername(): string | null {
    const userid = localStorage.getItem('userId');
    return userid ? userid.split('@')[0] : null;
  }

  setUsername(userid: string): void {
    localStorage.setItem('userId', userid);
    this.usernameSubject.next(userid.split('@')[0]); // Notify subscribers
  }

}
