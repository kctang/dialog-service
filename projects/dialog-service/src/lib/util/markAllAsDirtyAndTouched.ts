import { AbstractControl, FormArray, FormGroup } from '@angular/forms'

/**
 * Mark form control and all descendents as dirty and touched.
 *
 * @param control
 */
export const markAllAsDirtyAndTouched = (control: AbstractControl) => {
  control.markAsDirty()
  control.markAsTouched()
  if (control instanceof FormGroup) {
    const keys = Object.keys(control.controls)
    for (let key of keys) {
      markAllAsDirtyAndTouched(control.controls[ key ])
    }
  } else if (control instanceof FormArray) {
    for (let child of control.controls) {
      markAllAsDirtyAndTouched(child)
    }
  }
}
