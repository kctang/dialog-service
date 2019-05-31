import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

// @dynamic
@Component({
  templateUrl: './Progress.component.html',
  styleUrls: [ './Progress.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  constructor (@Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
  }
}
