import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { DialogService } from '../DialogService'
import { BaseFormComponent } from '../BaseFormComponent'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { QuickFormField } from 'ng-quick-form'

// @dynamic
@Component({
  templateUrl: './Form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent extends BaseFormComponent {
  constructor (
    cd: ChangeDetectorRef,
    dialogRef: MatDialogRef<FormComponent>,
    dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
      fields: QuickFormField[]
      submitButton: string
      cancelButton: string
      cancelMessage: string
      content?: string
    }
  ) {
    super(cd, dialogService, dialogRef, data.cancelMessage, data.fields)
  }
}
