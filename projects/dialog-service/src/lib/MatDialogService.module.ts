import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { AlertComponent } from './mat/Alert.component'
import { MatDialogService } from './MatDialogService'
import { ProgressComponent } from './mat/Progress.component'
import { ConfirmComponent } from './mat/Confirm.component'
import { FormComponent } from './mat/Form.component'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
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
