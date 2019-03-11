import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'
import { DialogFormFieldType } from './DialogFormFieldType'

export type DialogFormField = {
  title: string
  id?: string
  type?: DialogFormFieldType
  value?: string | string[]
  options?: ({ value: string, label: string } | string)[]
  required?: boolean
  validators?: ValidatorFn[]
  asyncValidators?: AsyncValidatorFn[]
}
