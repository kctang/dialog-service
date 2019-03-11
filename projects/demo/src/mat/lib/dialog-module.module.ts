import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DialogService } from './Dialog.service'
import { MdcDialogService } from './MdcDialog.service'
import { AlertComponent } from './mdc/Alert.component'
import { ConfirmComponent } from './mdc/Confirm.component'
import { FormComponent } from './mdc/Form.component'
import { ProgressComponent } from './mdc/Progress.component'
import { FormFieldComponent } from './mdc/FormField.component'
import { AngularMaterialModule } from '../../AngularMaterial.module'
import { AngularMdcModule } from '../../AngularMdc.module'

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    FormComponent,
    ProgressComponent,
    FormFieldComponent
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    FormComponent,
    ProgressComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularMdcModule
  ]
})
export class DialogModule {
  static withMdc (): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        { provide: DialogService, useClass: MdcDialogService }
      ]
    }
  }
}
