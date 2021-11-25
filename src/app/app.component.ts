import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validateEmail } from './ValidateEmail';
import { validateName } from './validateName';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // favoriteColorControl = new FormControl('');
  //favoriteColor = '';
  // signUp = new FormGroup({
  //   Name: new FormControl(),
  //   Email: new FormControl(),
  //   Password: new FormControl(),
  //   Address: new FormGroup({
  //     City: new FormControl(),
  //     Street: new FormControl(),
  //   }),
  // });
  // signUp = new FormGroup({
  //   Name: new FormControl(),
  //   Email: new FormControl(),
  //   Password: new FormControl(),
  //   Address: new FormGroup({
  //     City: new FormControl(),
  //     Street: new FormControl(),
  //   }),
  // });
  signUp!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signUp = fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), validateName]],
      Email: [
        '',
        [Validators.email, Validators.required, validateEmail(/.*com$/)],
      ],
      Age: ['', Validators.pattern(/[0-9]/)],
      Password: '',
      Address: fb.group({
        City: '',
        Street: '',
      }),
    });
    this.signUp.valueChanges.subscribe((changes) => {
      if (isNaN(changes.Age)) {
        this.signUp.patchValue({
          Age: changes.Age.replace(/[a-zA-Z]/g, ''),
        });
      }
    });

    // this.favoriteColorControl.valueChanges.subscribe((change) =>
    //   console.log(change)
    // );
    // setTimeout(() => {
    //   this.favoriteColorControl.setValue('Blue');
    //   this.favoriteColor = 'Red';
    // }, 2000);
  }
  get Name() {
    return this.signUp.get('Name');
  }
  get Email() {
    return this.signUp.get('Email');
  }
  get Age() {
    return this.signUp.get('Age');
  }
  doSubmit() {
    console.log(this.signUp.get('Name'));
  }
  // doReset() {
  //   this.signUp.patchValue({
  //     Name: '',
  //     Email: '',
  //     Password: '',
  //     Address: {
  //       City: '',
  //       Street: '',
  //     },
  //   });
  // }
}
