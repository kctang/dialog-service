import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MDC_DIALOG_DATA } from '@angular-mdc/web'

// @dynamic
@Component({
  templateUrl: './Confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {
  constructor (@Inject(MDC_DIALOG_DATA) public data: {
    title: string
    acceptButton: string
    cancelButton: string
    content?: string
  }) {
  }
}
