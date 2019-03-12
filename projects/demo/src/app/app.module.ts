import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularMaterialModule } from '../AngularMaterial.module'
import { AngularMdcModule } from '../AngularMdc.module'
import { MatDialogServiceModule } from '../mat/lib/MatDialogService.module'
import { MdcDialogServiceModule } from '../mat/lib/MdcDialogService.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularMdcModule,
    // MdcDialogServiceModule.forRoot(),
    MatDialogServiceModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
