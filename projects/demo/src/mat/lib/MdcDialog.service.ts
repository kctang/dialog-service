import { MdcDialog } from '@angular-mdc/web'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { concatMap, finalize, map, tap } from 'rxjs/operators'
import { DialogService } from './Dialog.service'
import { ProgressComponent } from './mdc/Progress.component'
import { AlertComponent } from './mdc/Alert.component'
import { ConfirmComponent } from './mdc/Confirm.component'
import { DialogFormField } from './models/DialogFormField'
import { FormComponent } from './mdc/Form.component'

@Injectable({
  providedIn: 'root'
})
export class MdcDialogService extends DialogService {
  constructor (private dialog: MdcDialog) {
    super()
  }

  withProgress<T = any> (work: Observable<T>, title?: string): Observable<T | undefined> {
    title = title || 'Please Wait...'
    let workOutput: T

    const ref = this.dialog.open(ProgressComponent, {
      clickOutsideToClose: false,
      escapeToClose: false,
      data: { title }
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

  withAlert (title: string, options?: { content?: string, acceptButton?: string }): Observable<boolean> {
    options = options || {}
    options.acceptButton = options.acceptButton || 'OK'

    const dialogRef = this.dialog.open(AlertComponent, {
      escapeToClose: false,
      clickOutsideToClose: false,
      data: { title, ...options }
    })

    return dialogRef.afterClosed().pipe(
      map(result => result === 'accept')
    )
  }

  withConfirm (title?: string, options?: {
    content?: string
    acceptButton?: string
    cancelButton?: string
  }): Observable<boolean> {
    title = title || 'Confirm?'
    options = options || {}
    options.acceptButton = options.acceptButton || 'Yes'
    options.cancelButton = options.cancelButton || 'No'

    const ref = this.dialog.open(ConfirmComponent, {
      escapeToClose: false,
      clickOutsideToClose: false,
      data: { title, ...options }
    })
    return ref.afterClosed().pipe(
      map(result => result === 'accept')
    )
  }

  withForm (title: string, fields: DialogFormField[], options?: {
    content?: string
    submitButton?: string
    cancelButton?: string
    cancelMessage?: string
  }): Observable<any> {
    options = options || {}
    options.submitButton = options.submitButton || 'Submit'
    options.cancelButton = options.cancelButton || 'Cancel'
    options.cancelMessage = options.cancelMessage || 'Cancel Form?'

    const ref = this.dialog.open(FormComponent, {
      escapeToClose: false,
      clickOutsideToClose: false,
      data: { title, fields, ...options }
    })

    return ref.afterClosed()
  }
}
