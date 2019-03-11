import { Injectable } from '@angular/core'
import { EMPTY, Observable } from 'rxjs'
import { DialogService } from './DialogService'
import { DialogFormField } from './models/DialogFormField'
import { MatDialog } from '@angular/material'
import { map } from 'rxjs/operators'
import { AlertComponent } from './mat/Alert.component'

@Injectable({
  providedIn: 'root'
})
export class MatDialogService extends DialogService {
  constructor (private dialog: MatDialog) {
    super()
  }

  withProgress<T = any> (work: Observable<T>, title?: string): Observable<T | undefined> {
    return EMPTY
  }

  withAlert (title: string, options?: { content?: string, acceptButton?: string }): Observable<boolean> {
    options = options || {}
    options.acceptButton = options.acceptButton || 'OK'

    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
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
    return EMPTY
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
