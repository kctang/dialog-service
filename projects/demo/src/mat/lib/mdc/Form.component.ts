import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web'
import { FormBuilder, FormGroup } from '@angular/forms'
import { filter, startWith, take, tap } from 'rxjs/operators'
import { DialogFormField } from '../models/DialogFormField'
import { assert } from '../util/assert'
import { markAllAsTouched } from '../util/markAllAsTouched'
import { DialogService } from '../DialogService'

// @dynamic
@Component({
  templateUrl: './Form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  form: FormGroup

  constructor (
    @Inject(MDC_DIALOG_DATA) public data: {
      title: string
      fields: DialogFormField[]
      submitButton: string
      cancelButton: string
      cancelMessage: string
      content?: string
    },
    private dialogRef: MdcDialogRef<FormComponent>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    const fb = new FormBuilder()

    // pre-process dialog form fields to set default values
    data.fields = data.fields.map(field => {
      if (!field.id) {
        field.id = this.camelize(field.title)
      }

      if (!field.type) {
        field.type = 'text'
      }

      if (field.options) {
        // perform #conversion to { value: string, label: string }
        field.options = field.options.map(option => {
          if (typeof option === 'string') {
            return { label: option, value: option }
          } else {
            return option
          }
        })
      }

      return field
    })

    // transform DialogFormField[] to FormBuilder's controls config
    const formDefinition: any = {}
    data.fields.map(field => {
      if (field.type === 'checkbox') {
        // will always be options2 type because of #conversion
        const options2 = field.options as { value: string, label: string }[] || []
        const options = options2.map(option => {
          const values = Array.isArray(field.value) ? field.value : [ field.value ]
          return fb.group({
            checkboxItem: [ values.indexOf(option.value) !== -1 ? option.value : '' ]
          })
        })
        formDefinition[ field.id! ] = fb.array(options, [
          ...(field.validators) || []
        ], [
          ...(field.asyncValidators) || []
        ])
      } else {
        formDefinition[ field.id! ] = [ field.value || '', [
          ...(field.validators || [])
        ], [
          ...(field.asyncValidators || [])
        ] ]
      }
    })

    this.form = fb.group(formDefinition)
  }

  doClose () {
    // close form dialog, return false as result
    this.dialogService.withConfirm(this.data.cancelMessage).pipe(
      filter(confirm => confirm),
      tap(() => this.dialogRef.close(false))
    ).subscribe()
  }

  doSubmit () {
    if (this.form.status === 'PENDING') {
      // if form is pending validation, let's wait...
      this.dialogService.withProgress(this.form.statusChanges.pipe(
        startWith(this.form.status),
        filter(status => status !== 'PENDING'),
        take(1),
        tap(() => this.doNonPendingSubmit())
      ))
    } else {
      this.doNonPendingSubmit()
    }
  }

  doNonPendingSubmit () {
    assert(this.form.status !== 'PENDING', 'Form status should not be pending')

    markAllAsTouched(this.form)
    if (!this.form.valid) {
      return
    }

    // transform checkbox values
    const formValue = this.form.value
    this.data.fields.map(field => {
      if (field.type === 'checkbox') {
        const values: { checkboxItem: boolean }[] = formValue[ field.id! ]
        formValue[ field.id! ] = values
          .map((val, idx) => ({
            checkboxItem: val.checkboxItem,
            index: idx
          }))
          .filter(val => val.checkboxItem)
          .reduce((previousValue, currentValue) => {
            // always contain value because of #conversion
            const options2 = field.options as { value: string, label: string }[] || []
            const option = options2[ currentValue.index ]
            return [
              ...previousValue,
              option.value
            ]
          }, [] as string[])
      }
    })
    // close form dialog, return form value object as result
    this.dialogRef.close(formValue)
  }

  // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
  camelize (str: string) {
    return str.replace(
      /(?:^\w|[A-Z]|\b\w)/g,
      function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
      }).replace(/\s+/g, '')
  }
}
