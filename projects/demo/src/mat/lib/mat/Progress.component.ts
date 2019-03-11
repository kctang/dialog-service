import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MDC_DIALOG_DATA } from '@angular-mdc/web'

// @dynamic
@Component({
  templateUrl: './Progress.component.html',
  styleUrls: [ './Progress.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  constructor (@Inject(MDC_DIALOG_DATA) public data: { title: string }
  ) {
  }
}
