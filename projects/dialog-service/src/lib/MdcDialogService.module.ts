import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { MdcDialogService } from './MdcDialogService'
import { AlertComponent } from './mdc/Alert.component'
import { ConfirmComponent } from './mdc/Confirm.component'
import { FormComponent } from './mdc/Form.component'
import { ProgressComponent } from './mdc/Progress.component'
import { FormFieldComponent } from './mdc/FormField.component'
import {
  MdcButtonModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcFormFieldModule,
  MdcLinearProgressModule,
  MdcRadioModule,
  MdcSelectModule,
  MdcSwitchModule,
  MdcTextFieldModule
} from '@angular-mdc/web'

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
    MdcButtonModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcFormFieldModule,
    MdcLinearProgressModule,
    MdcRadioModule,
    MdcSelectModule,
    MdcSwitchModule,
    MdcTextFieldModule
  ],
  providers: [
    MdcDialogService,
    { provide: DialogService, useClass: MdcDialogService }
  ]
})
export class MdcDialogServiceModule {
}
