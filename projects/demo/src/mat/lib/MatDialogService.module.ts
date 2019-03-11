import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { DialogService } from './DialogService'
import { AngularMaterialModule } from '../../AngularMaterial.module'
import { AngularMdcModule } from '../../AngularMdc.module'
import { AlertComponent } from './mat/Alert.component'
import { MatDialogService } from './MatDialogService'

@NgModule({
  declarations: [
    AlertComponent,
    // ConfirmComponent,
    // FormComponent,
    // ProgressComponent,
    // FormFieldComponent
  ],
  entryComponents: [
    AlertComponent,
    // ConfirmComponent,
    // FormComponent,
    // ProgressComponent,
    // FormFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularMdcModule
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
