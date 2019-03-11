import { Injectable } from '@angular/core'
import { EMPTY, Observable } from 'rxjs'
import { DialogService } from './DialogService'
import { DialogFormField } from './models/DialogFormField'
import { MatDialog } from '@angular/material'
import { concatMap, finalize, map, tap } from 'rxjs/operators'
import { AlertComponent } from './mat/Alert.component'
import { ProgressComponent } from './mat/Progress.component'
import { ConfirmComponent } from './mat/Confirm.component'

@Injectable({
  providedIn: 'root'
})
export class MatDialogService extends DialogService {
  constructor (private dialog: MatDialog) {
    super()
  }

  withProgress<T = any> (work: Observable<T>, title?: string): Observable<T | undefined> {
    title = title || 'Please Wait...'
    let workOutput: T

    const ref = this.dialog.open(ProgressComponent, {
      disableClose: true,
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
      disableClose: true,
      minWidth: 200,
      data: { title, ...options }
    })

    return dialogRef.afterClosed().pipe(
      map(result => result === true)
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
      disableClose: true,
      data: { title, ...options }
    })
    return ref.afterClosed().pipe(
      map(result => result)
    )
  }

  withForm (title: string, fields: DialogFormField[], options?: {
    content?: string
    submitButton?: string
    cancelButton?: string
    cancelMessage?: string
  }): Observable<any> {
    return EMPTY
  }
}
