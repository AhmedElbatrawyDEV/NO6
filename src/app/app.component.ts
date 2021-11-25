import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { validateEmail } from './ValidateEmail'
import { validateName } from './validateName'
import Validation from './ValidatePassword'

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
  signUp!: FormGroup
  myform!: FormGroup
  constructor(private fb: FormBuilder) {
    this.signUp = this.fb.group(
      {
        Name: ['', [Validators.required, Validators.minLength(3), validateName]],
        Email: ['', [Validators.email, Validators.required, validateEmail(/.*com$/)]],
        Age: ['', Validators.pattern(/[0-9]/)],
        password: '',
        confirmPassword: [''],
        Address: this.fb.group({
          City: '',
          Street: '',
        }),
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    )
    this.signUp.valueChanges.subscribe((changes) => {
      if (isNaN(changes.Age)) {
        this.signUp.patchValue({
          Age: changes.Age.replace(/[a-zA-Z]/g, ''),
        })
      }
    })

    // this.favoriteColorControl.valueChanges.subscribe((change) =>
    //   console.log(change)
    // );
    // setTimeout(() => {
    //   this.favoriteColorControl.setValue('Blue');
    //   this.favoriteColor = 'Red';
    // }, 2000);
  }
  get Name() {
    return this.signUp.get('Name')
  }
  get Email() {
    return this.signUp.get('Email')
  }
  get Age() {
    return this.signUp.get('Age')
  }
  doSubmit() {
    console.log(this.signUp.get('Name'))
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

  ngOnInit(): void {
    this.myform = this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(40)],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    )
  }
  onReset(): void {
    console.log(this.signUp.get('confirmPassword'))
  }
}
