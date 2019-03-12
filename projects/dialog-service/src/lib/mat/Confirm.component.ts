import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'

// @dynamic
@Component({
  templateUrl: './Confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public data: {
    title: string
    acceptButton: string
    cancelButton: string
    content?: string
  }) {
  }
}
