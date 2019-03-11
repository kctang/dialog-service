import { AbstractControl, FormArray, FormGroup } from '@angular/forms'

/**
 * Mark form control and all descendents as touched.
 *
 * @param control
 */
export const markAllAsTouched = (control: AbstractControl) => {
  control.markAsTouched()
  if (control instanceof FormGroup) {
    const keys = Object.keys(control.controls)
    for (let key of keys) {
      markAllAsTouched(control.controls[ key ])
    }
  } else if (control instanceof FormArray) {
    for (let child of control.controls) {
      markAllAsTouched(child)
    }
  }
}
