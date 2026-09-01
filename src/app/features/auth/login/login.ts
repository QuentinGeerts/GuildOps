import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PasswordToggleDirective } from "../../../shared/directives/password-toggle.directive";

@Component({
  imports: [ReactiveFormsModule, PasswordToggleDirective],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  readonly auth: AuthService = inject(AuthService);
  readonly router: Router = inject(Router);
  
  readonly form: FormGroup = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {

    console.log("Déclencement de onSubmit");
    
    if (!this.form.valid) return;

    console.log("Formulaire valide");

    this.auth.login(this.form.getRawValue()).subscribe({

      next: () => this.router.navigate(["dashboard"]),
      error: (err) => { console.log("Erreur: ", err) }

    })
  }
  

}
