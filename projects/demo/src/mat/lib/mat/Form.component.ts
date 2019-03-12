import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { DialogFormField } from '../models/DialogFormField'
import { DialogService } from '../DialogService'
import { BaseFormComponent } from '../BaseFormComponent'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

// @dynamic
@Component({
  templateUrl: './Form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './Form.component.scss' ]
})
export class FormComponent extends BaseFormComponent {
  constructor (
    cd: ChangeDetectorRef,
    dialogRef: MatDialogRef<FormComponent>,
    dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
      fields: DialogFormField[]
      submitButton: string
      cancelButton: string
      cancelMessage: string
      content?: string
    }
  ) {
    super(cd, dialogService, dialogRef, data.fields, data.cancelMessage)
  }
}
