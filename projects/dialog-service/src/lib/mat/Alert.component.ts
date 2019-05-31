import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

// @dynamic
@Component({
  templateUrl: './Alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public data: {
    title: string
    acceptButton: string
    content?: string
  }) {
  }
}
