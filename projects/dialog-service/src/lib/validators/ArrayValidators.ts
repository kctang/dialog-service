import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms'
import { assert } from '../util/assert'

// @dynamic
export class ArrayValidators {
  /**
   * Validates that 'checkbox' dialog form field has the specified minimum number of selected values.
   *
   * @param min Minimum number of selected values required to pass validation.
   */
  public static minSelectedValues (min: number): ValidatorFn {
    return (control: AbstractControl) => {
      assert(control instanceof FormArray,
        'ArrayValidators.minSelectedValues() must be used with FormArray controls')

      const array = control as FormArray
      const count = array.controls.filter(c => !!c.value.checkboxItem).length
      return count >= min ? null : {
        [ `At least ${min} item(s) must be selected` ]: true
      }
    }
  }
}
