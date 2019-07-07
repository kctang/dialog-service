import { FormGroup } from '@angular/forms'
import { ChangeDetectorRef, OnDestroy } from '@angular/core'
import { DialogService } from './DialogService'
import { debounceTime, filter, startWith, take, tap } from 'rxjs/operators'
import { assert } from './util/assert'
import { QuickForm, QuickFormField } from 'ng-quick-form'
import { markAllAsDirtyAndTouched } from './util/markAllAsDirtyAndTouched'
import { Subject, Subscription } from 'rxjs'

type Closeable = {
  close: (result: any) => void
}

/**
 * Manage form creation and submission.
 */
export class BaseFormComponent implements OnDestroy {
  submitted = false
  form: FormGroup
  formSubscription?: Subscription

  constructor (
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private closeable: Closeable,
    private cancelMessage: string,
    public formFields: QuickFormField[],
    private rawValue: boolean,
    private valueChanges?: Subject<{ value: any, form: FormGroup, cd: ChangeDetectorRef }>,
    private formCreated?: (form: FormGroup, cd: ChangeDetectorRef) => void
  ) {
    this.form = QuickForm.makeForm(this.formFields)

    if (formCreated) {
      formCreated(this.form, this.cd)
    }
    if (this.valueChanges) {
      this.formSubscription = this.form.valueChanges.pipe(
        debounceTime(100),
        tap(value => this.valueChanges!.next({
          value, form: this.form, cd
        }))
      ).subscribe()
    }
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
    this.closeable.close(QuickForm.preProcessFormValues(
      this.rawValue ? this.form.getRawValue() : this.form.value))
  }

  ngOnDestroy (): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe()
    }
  }
}
