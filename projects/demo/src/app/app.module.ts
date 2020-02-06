/// <reference path="../global.d.ts" />
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularMaterialModule } from '../AngularMaterial.module'
import { HighlightModule } from 'ngx-highlightjs'
import typescript from 'highlight.js/lib/languages/typescript'

import { MatDialogServiceModule } from 'dialog-service'
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
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatDialogServiceModule,
    QuickFormModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
