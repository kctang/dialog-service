import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { MdcDialogService } from './MdcDialogService'
import { AlertComponent } from './mdc/Alert.component'
import { ConfirmComponent } from './mdc/Confirm.component'
import { ProgressComponent } from './mdc/Progress.component'
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
    ProgressComponent
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
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
