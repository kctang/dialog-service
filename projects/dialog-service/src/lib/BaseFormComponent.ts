import { FormGroup } from '@angular/forms'
import { ChangeDetectorRef } from '@angular/core'
import { DialogService } from './DialogService'
import { filter, startWith, take, tap } from 'rxjs/operators'
import { assert } from './util/assert'
import { QuickForm, QuickFormField } from 'ng-quick-form'
import { markAllAsDirtyAndTouched } from './util/markAllAsDirtyAndTouched'

type Closeable = {
  close: (result: any) => void
}

/**
 * Manage form creation and submission.
 */
export class BaseFormComponent {
  submitted = false
  form: FormGroup

  constructor (
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private closeable: Closeable,
    private cancelMessage: string,
    public formFields: QuickFormField[]
  ) {
    this.form = QuickForm.makeForm(this.formFields)
  }

  doClose () {
    // close form dialog, return false as result
    this.dialogService.withConfirm(this.cancelMessage).pipe(
      filter(confirm => confirm),
      tap(() => this.closeable.close(false))
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

    markAllAsDirtyAndTouched(this.form)
    this.submitted = true // attempted to submit (affects validation messages)
    this.cd.markForCheck()
    if (!this.form.valid) {
      return
    }

    // close form dialog, return form value object as result
    this.closeable.close(QuickForm.preProcessFormValues(this.form.value))
  }
}
