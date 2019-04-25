import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularMaterialModule } from '../AngularMaterial.module'
import { AngularMdcModule } from '../AngularMdc.module'
import { HighlightModule } from 'ngx-highlightjs'
import typescript from 'highlight.js/lib/languages/typescript'

import { MatDialogServiceModule, MdcDialogServiceModule } from 'dialog-service'
import { FormsModule } from '@angular/forms'
import { QuickFormModule } from 'ng-quick-form'

export function hljsLanguages () {
  return [
    { name: 'typescript', func: typescript }
  ]
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    AngularMdcModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatDialogServiceModule,
    MdcDialogServiceModule,
    QuickFormModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
