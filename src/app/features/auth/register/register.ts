import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PasswordToggleDirective } from '../../../shared/directives/password-toggle.directive';
import { RegisterPlayerRequest } from '../../../shared/models/auth.model';
import {
  passwordStrength,
  PasswordStrengthErrors,
} from '../../../shared/validators/password-strength.validator';

@Component({
  imports: [RouterLink, ReactiveFormsModule, PasswordToggleDirective],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form: FormGroup = inject(FormBuilder).nonNullable.group({
    accountName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(256)]],
    password: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(128), passwordStrength()],
    ],
  });

  get accountName() {
    return this.form.controls['accountName'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get passwordStrengthErrors(): PasswordStrengthErrors | null {
    return this.password.errors?.['passwordstrength'] ?? null;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const credentials: RegisterPlayerRequest = this.form.value;

    this.authService.register(credentials).subscribe({
      next: () => {
        this.authService
          .login({ email: credentials.email, password: credentials.password })
          .subscribe({
            next: () => this.router.navigate(['dashboard']),
            error: (err) => console.log('Erreur: ', err),
          });
      },
      error: (err) => {
        console.log('Erreur: ', err);
      },
    });
  }
}
