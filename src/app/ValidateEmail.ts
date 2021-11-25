import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function validateName(
//   control: AbstractControl
// ): { [key: string]: boolean } | null {
//   if (control.value.match(/[0-9]/g)) {
//     return { invalidName: true };
//   } else {
//     return null;
//   }
// }

export function validateEmail(Regex: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value.match(/[0-9]/g)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
