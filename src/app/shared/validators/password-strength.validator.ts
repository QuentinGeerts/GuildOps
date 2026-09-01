import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export interface PasswordStrengthErrors {
  digit?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  special?: boolean;
}

export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value as string | null;

    // Vérifier si le champ est vide
    if (!value) return null;

    const errors: PasswordStrengthErrors = {};

    if (!/[0-9]/u.test(value)) errors.digit = true;
    if (!/\p{Ll}/u.test(value)) errors.lowercase = true;
    if (!/\p{Lu}/u.test(value)) errors.uppercase = true;
    if (!/[\p{P}\p{S}]/u.test(value)) errors.special = true;

    return Object.keys(errors).length > 0 ? { passwordstrength: errors } : null;
  };
}