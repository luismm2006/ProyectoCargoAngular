import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private service = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  formRegister : FormGroup = this.fb.group({
    name : ["", [Validators.required]],
    email : ["", [Validators.required, Validators.email]],
    password : ["", [Validators.required]]
  })

  notValid(field : string){
    return this.formRegister.controls[field].errors && this.formRegister.controls[field].touched
  }

  getError(field : string){
    if(!this.formRegister.controls[field]) return null;

    const errors = this.formRegister.controls[field].errors || {};

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

  registrarPiloto(){
    if(this.formRegister.valid){
      const {name, email, password} = this.formRegister.value;
      this.service.registrarPiloto(name, email, password).subscribe({
        next: resp => {
          this.router.navigate(["/"])
        }
      })
    }
  }
}
