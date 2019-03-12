import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { MDC_DIALOG_DATA, MdcDialogRef } from '@angular-mdc/web'
import { DialogFormField } from '../models/DialogFormField'
import { DialogService } from '../DialogService'
import { BaseFormComponent } from '../BaseFormComponent'

// @dynamic
@Component({
  templateUrl: './Form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends BaseFormComponent {
  constructor (
    cd: ChangeDetectorRef,
    dialogRef: MdcDialogRef<FormComponent>,
    dialogService: DialogService,
    @Inject(MDC_DIALOG_DATA) public data: {
      title: string
      fields: DialogFormField[]
      submitButton: string
      cancelButton: string
      cancelMessage: string
      content?: string
    }
  ) {
    super(cd, dialogService, dialogRef, data.cancelMessage, data.fields)
  }
}
