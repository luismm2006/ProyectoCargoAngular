import { Component, inject } from '@angular/core';
import { AuthService } from '../Service/auth-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private service = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  formLogin : FormGroup = this.fb.group({
    email : ["", [Validators.required, Validators.email]],
    password : ["", [Validators.required]]
  })

  notValid(field : string){
    return this.formLogin.controls[field].errors && this.formLogin.controls[field].touched
  }

  getErrors(field : string){
    if(!this.formLogin.controls[field]) return null;

    const errors = this.formLogin.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case "required":
          return "El campo es requerido"
        case "email":
          return "El email es inválido"
        default: 
          return null
      }
    }
    return null
  }

  login(){
    if(this.formLogin.valid){
      const {email, password} = this.formLogin.value;
      this.service.login(email, password).subscribe({
        next: resp => {
          this.router.navigate(["/"])
        }
      })
    }
  }
}
