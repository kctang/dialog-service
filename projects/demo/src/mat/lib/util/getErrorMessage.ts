import { AbstractControl } from '@angular/forms'

export const getErrorMessage = (control: AbstractControl) => {
  if (control.touched && control.invalid && control.errors) {
    const messages = Object.keys(control.errors).map(key => {
      const obj = control.getError(key)
      switch (key) {
        case 'required':
          return 'Required'
        case 'minlength':
          return `Minimum length is ${obj.requiredLength}`
        case 'maxlength':
          return `Maximum length is ${obj.requiredLength}`
        case 'min':
          return `Minimum value is ${obj.min}`
        case 'max':
          return `Maximum value is ${obj.max}`
        case 'matDatepickerParse':
          return 'Date required'
        case 'pattern':
          return 'Invalid pattern'
        default:
          return key
      }
    })

    return messages[ 0 ]
  }
}
