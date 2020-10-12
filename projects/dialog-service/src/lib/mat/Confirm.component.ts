import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

// @dynamic
@Component({
  templateUrl: './Confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent implements OnInit {
  safeContent?: SafeHtml

  constructor (@Inject(MAT_DIALOG_DATA) public data: {
                 title: string
                 acceptButton: string
                 cancelButton: string
                 content?: string
               },
               private sanitize: DomSanitizer) {
  }

  ngOnInit (): void {
    if (this.data.content) {
      this.safeContent = this.sanitize.bypassSecurityTrustHtml(this.data.content)
    }
  }
}
