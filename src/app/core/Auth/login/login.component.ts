import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string='';


  constructor(private fb:FormBuilder,private authService:AuthServiceService,private router:Router) {
   this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(4)]]
   });
  }

  login() {
    console.log("login starts.....!");
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response)=>{
          this.authService.saveToken(response.token,response.email);
          this.authService.setUsername(response.email);
          this.router.navigate(['/quiz']);
          console.log(response.token);
        },
        error:()=>{
          this.errorMessage='Invalid email or password';
        }

      })
      
    }

  }
}
