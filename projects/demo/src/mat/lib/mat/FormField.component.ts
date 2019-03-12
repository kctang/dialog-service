import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'
import { AbstractControl, FormArray, FormGroup } from '@angular/forms'
import { DialogFormField } from '../models/DialogFormField'
import { getErrorMessage } from '../util/getErrorMessage'

@Component({
  selector: 'form-field',
  templateUrl: './FormField.component.html',
  styleUrls: [ './FormField.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  @Input()
  form!: FormGroup

  @Input()
  field!: DialogFormField

  // track form submission so that we can use OnPush (TODO: try to remove this)
  @Input()
  submitted!: boolean

  constructor (private cd: ChangeDetectorRef) {
  }

  errorMessage (control: AbstractControl) {
    return getErrorMessage(control)
  }

  getChildControls (fieldId: string) {
    const control = this.form.get(fieldId) as FormArray
    return control.controls
  }

  get fieldId () {
    return this.field.id!
  }

  getOptionValue (i: number) {
    const option = this.field.options![ i ] as { value: string }
    return option.value
  }

  getOptionLabel (i: number) {
    const option = this.field.options![ i ] as { label: string }
    return option.label
  }
}
