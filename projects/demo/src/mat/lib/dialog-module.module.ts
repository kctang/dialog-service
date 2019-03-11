import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DialogService } from './Dialog.service'
import { MatDialogService } from './MatDialog.service'
import { AlertComponent } from './mat/Alert.component'
import { ConfirmComponent } from './mat/Confirm.component'
import { FormComponent } from './mat/Form.component'
import { ProgressComponent } from './mat/Progress.component'
import { FormFieldComponent } from './mat/FormField.component'
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
  static withMat (): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [
        { provide: DialogService, useClass: MatDialogService }
      ]
    }
  }
}
