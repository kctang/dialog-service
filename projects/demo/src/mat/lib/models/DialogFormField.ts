import { AsyncValidatorFn, ValidatorFn } from '@angular/forms'
import { DialogFormFieldType } from './DialogFormFieldType'

/**
 * DialogFormField represents definition for a field. It is used by withForm() function to define
 * a form dialog.
 */
export type DialogFormField = {
  /**
   * Label for the field. Required.
   */
  title: string

  /**
   * Unique identifier for the field. Optional. Defaults to camel case representation of title.
   */
  id?: string

  /**
   * Field type. Valid values are 'text', 'textarea', 'switch', 'radio', 'checkbox', 'select' and
   * 'password'. Optional. Defaults to 'text'.
   */
  type?: DialogFormFieldType

  /**
   * Default value for the field when the form is displayed. Optional.
   */
  value?: string | string[]

  /**
   * List of possible options for 'radio', 'checkbox' and 'select' field types. Options can be
   * specified as an "array of string" or an "array of object with 'value' and 'label' as
   * keys". Optional.
   */
  options?: ({ value: string, label: string } | string)[]

  /**
   * Flag to indicate that field input is required. Optional. Defaults to false.
   */
  required?: boolean

  /**
   * Array of Angular validation functions (i.e. ValidatorFn). Optional.
   */
  validators?: ValidatorFn[]

  /**
   * Array of asynchronous Angular validation functions (i.e. AsyncValidatorFn). Optional.
   */
  asyncValidators?: AsyncValidatorFn[]
}
