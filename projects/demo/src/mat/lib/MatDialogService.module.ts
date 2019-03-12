import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { AlertComponent } from './mat/Alert.component'
import { MatDialogService } from './MatDialogService'
import { ProgressComponent } from './mat/Progress.component'
import { ConfirmComponent } from './mat/Confirm.component'
import { FormFieldComponent } from './mat/FormField.component'
import { FormComponent } from './mat/Form.component'
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material'

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

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class MatDialogServiceModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: MatDialogServiceModule,
      providers: [
        { provide: DialogService, useClass: MatDialogService }
      ]
    }
  }
}
