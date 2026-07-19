import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),

      studentEmail: this.fb.control(
        '',
        {
          validators: [
            Validators.required,
            Validators.email
          ],
          asyncValidators: [
            this.simulateEmailCheck()
          ],
          updateOn: 'blur'
        }
      ),

      courseId: this.fb.control('', [
        Validators.required,
        this.noCourseCode
      ]),

      preferredSemester: this.fb.control('Odd', [
        Validators.required
      ]),

      agreeToTerms: this.fb.control(false, [
        Validators.requiredTrue
      ]),

      additionalCourses: this.fb.array<FormControl<string | null>>([])

    });

  }

  // -----------------------------
  // Custom Validator
  // -----------------------------

  noCourseCode(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    if (
      value &&
      value.toString().startsWith('XX')
    ) {

      return {
        noCourseCode: true
      };

    }

    return null;

  }

  // -----------------------------
  // Async Validator
  // -----------------------------

  simulateEmailCheck(): AsyncValidatorFn {

    return (control: AbstractControl) => {

      return new Promise<ValidationErrors | null>((resolve) => {

        setTimeout(() => {

          if (
            control.value &&
            control.value.includes('test@')
          ) {

            resolve({
              emailTaken: true
            });

          } else {

            resolve(null);

          }

        }, 800);

      });

    };

  }

  // -----------------------------
  // FormArray Getter
  // -----------------------------

  get additionalCourses(): FormArray<FormControl<string | null>> {

    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray<FormControl<string | null>>;

  }

  // -----------------------------
  // Add Course
  // -----------------------------

  addCourse(): void {

    this.additionalCourses.push(

      this.fb.control('', Validators.required)

    );

  }

  // -----------------------------
  // Remove Course
  // -----------------------------

  removeCourse(index: number): void {

    this.additionalCourses.removeAt(index);

  }

  // -----------------------------
  // Submit
  // -----------------------------

  onSubmit(): void {

    console.log("Form Value");

    console.log(this.enrollForm.value);

    console.log("Raw Value");

    console.log(this.enrollForm.getRawValue());



    
    /*
      enrollForm.value
      ----------------
      Returns only ENABLED controls.

      enrollForm.getRawValue()
      ------------------------
      Returns ALL controls,
      including disabled controls.
    */

  }
  canDeactivate(): boolean {

  console.log("canDeactivate called");

  console.log("Dirty:", this.enrollForm.dirty);

  if (this.enrollForm.dirty) {

    return window.confirm(
      "You have unsaved changes. Leave?"
    );

  }

  return true;

}

}