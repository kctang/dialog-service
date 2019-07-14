import { ChangeDetectorRef, Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { DialogService } from './DialogService'
import { MatDialog } from '@angular/material/dialog'
import { concatMap, finalize, map, tap } from 'rxjs/operators'
import { AlertComponent } from './mat/Alert.component'
import { ProgressComponent } from './mat/Progress.component'
import { ConfirmComponent } from './mat/Confirm.component'
import { FormComponent } from './mat/Form.component'
import { QuickFormField } from 'ng-quick-form'
import { FormGroup } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class MatDialogService extends DialogService {
  constructor (private dialog: MatDialog) {
    super()
  }

  withProgress<T = any> (
    work: Observable<T>, title?: string,
    options?: {
      dialogOptions?: { [ key: string ]: any }
    }): Observable<T | undefined> {
    title = title || 'Please Wait...'
    let workOutput: T

    const ref = this.dialog.open(ProgressComponent, {
      disableClose: true,
      data: { title },
      ...(options && options.dialogOptions || {})
    })

    ref.afterOpened().pipe(
      concatMap(() => work),
      tap(val => workOutput = val), // set workOutput
      finalize(() => ref.close())
    ).subscribe()

    return ref.afterClosed().pipe(
      map(() => workOutput) // return workOutput
    )
  }

  withAlert (title: string, options?: {
    content?: string
    acceptButton?: string
    dialogOptions?: { [ key: string ]: any }
  }): Observable<boolean> {
    options = options || {}
    options.acceptButton = options.acceptButton || 'OK'

    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      minWidth: 200,
      data: { title, ...options },
      ...(options && options.dialogOptions || {})
    })

    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    )
  }

  withConfirm (title?: string, options?: {
    content?: string
    acceptButton?: string
    cancelButton?: string
    dialogOptions?: { [ key: string ]: any }
  }): Observable<boolean> {
    title = title || 'Confirm?'
    options = options || {}
    options.acceptButton = options.acceptButton || 'Yes'
    options.cancelButton = options.cancelButton || 'No'

    const ref = this.dialog.open(ConfirmComponent, {
      disableClose: true,
      data: { title, ...options },
      ...(options && options.dialogOptions || {})
    })
    return ref.afterClosed().pipe(
      map(result => result)
    )
  }

  withForm (title: string, fields: QuickFormField[], options?: {
    content?: string
    submitButton?: string
    cancelButton?: string
    cancelMessage?: string
    rawValue?: boolean
    layout?: {
      flexCell?: boolean | 6 | 12
      gutter?: boolean
      growItems?: boolean
      debug?: boolean
    },
    valueChanges?: Subject<{ value: any, form: FormGroup, cd: ChangeDetectorRef }>
    formCreated?: (form: FormGroup, cd: ChangeDetectorRef) => void
    dialogOptions?: { [ key: string ]: any }
  }): Observable<any> {
    options = options || {}
    options.submitButton = options.submitButton || 'Submit'
    options.cancelButton = options.cancelButton || 'Cancel'
    options.cancelMessage = options.cancelMessage || 'Cancel?'
    options.rawValue = options.rawValue || false

    const ref = this.dialog.open(FormComponent, {
      disableClose: true,
      data: { title, fields, ...options },
      ...(options && options.dialogOptions || {})
    })

    return ref.afterClosed()
  }
}
