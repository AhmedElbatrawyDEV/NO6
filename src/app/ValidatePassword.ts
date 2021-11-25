import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
export function validatePassword(
  control1: string,
  control2: string
): ValidatorFn {
  return (myform: AbstractControl): { [key: string]: boolean } | null => {
    const password = myform.get(control1);
    const confirmpassword = myform.get[control2];
    if (password.value != confirmpassword.value) {
    }
    console.log('In ValidatePassword');
    return null;
  };
}
