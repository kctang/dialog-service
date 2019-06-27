import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { DialogService } from '../DialogService'
import { BaseFormComponent } from '../BaseFormComponent'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { QuickFormField } from 'ng-quick-form'
import { Subject } from 'rxjs'
import { FormGroup } from '@angular/forms'

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
      content?: string
      submitButton: string
      cancelButton: string
      cancelMessage: string
      layout?: {
        flexCell?: boolean | 6 | 12
        gutter?: boolean
        growItems?: boolean
        debug?: boolean
      }
      valueChanges?: Subject<{ value: any, form: FormGroup }>
    }
  ) {
    super(cd, dialogService, dialogRef, data.cancelMessage, data.fields, data.valueChanges)
  }

  get attrFlexCell () {
    const flexCell = this.data.layout && this.data.layout.flexCell
    // must return null for Angular to remove the attribute
    return flexCell ? true : null
  }

  get attrGutter () {
    const gutter = this.data.layout && this.data.layout.gutter
    // must return null for Angular to remove the attribute
    return gutter ? true : null
  }

  get attrGrowItems () {
    const growItems = this.data.layout && this.data.layout.growItems
    // must return null for Angular to remove the attribute
    return growItems ? true : null
  }

  get attrDefaultCell6 () {
    const flexCell = this.data.layout && this.data.layout.flexCell
    // must return null for Angular to remove the attribute
    return flexCell === 6 ? true : null
  }

  get attrDefaultCell12 () {
    const flexCell = this.data.layout && this.data.layout.flexCell
    // must return null for Angular to remove the attribute
    return flexCell === 12 ? true : null
  }

  get attrDebug () {
    const debug = this.data.layout && this.data.layout.debug
    // must return null for Angular to remove the attribute
    return debug ? true : null
  }
}
