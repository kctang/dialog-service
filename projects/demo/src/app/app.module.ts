import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularMaterialModule } from '../AngularMaterial.module'
import { AngularMdcModule } from '../AngularMdc.module'
import { DialogModule } from '../mat/lib/dialog-module.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularMdcModule,
    DialogModule.withMat()
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
