import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgForOf, ReactiveFormsModule, NgIf, ProjectFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    // creating a form
    this.signupForm = new FormGroup({
      // controls
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null, // Initial value
          {
            validators: [Validators.required, Validators.email], // Synchronous validators
            asyncValidators: [this.forbiddenEmails.bind(this)], // Asynchronous validators (should be in array form)
          }
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.signupForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Max',
    //     email: 'max@test.com',
    //     gender: 'male',
    //     hobbies: [],
    //   },
    // });
    // this.signupForm.patchValue({ // pre-defining a value---------------
    //   userData: {
    //     username: 'Max',
    //   },
    // });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null!;
  }

  async forbiddenEmails(control: AbstractControl): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
