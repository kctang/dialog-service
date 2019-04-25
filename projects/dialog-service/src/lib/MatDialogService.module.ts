import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { AlertComponent } from './mat/Alert.component'
import { MatDialogService } from './MatDialogService'
import { ProgressComponent } from './mat/Progress.component'
import { ConfirmComponent } from './mat/Confirm.component'
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
import { QuickFormModule } from 'ng-quick-form'

@NgModule({
  declarations: [
    AlertComponent,
    ConfirmComponent,
    FormComponent,
    ProgressComponent
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    FormComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    QuickFormModule
  ],
  providers: [
    MatDialogService,
    { provide: DialogService, useClass: MatDialogService }
  ]
})
export class MatDialogServiceModule {
}
