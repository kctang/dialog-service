import { Component } from '@angular/core'
import { DialogService } from '../mat/lib/DialogService'
import { of } from 'rxjs'
import { concatMap, delay, filter, map, tap } from 'rxjs/operators'
import { AsyncValidatorFn, Validators } from '@angular/forms'
import { DialogFormField } from '../mat/lib/models/DialogFormField'
import { ArrayValidators } from '../mat/lib/util/ArrayValidators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  fields: DialogFormField[] = [
    {
      title: 'Name', required: true,
      validators: [
        Validators.minLength(3),
        Validators.maxLength(10)
      ]
    },
    { title: 'Programmer?', type: 'switch' },
    {
      title: 'Experience in', type: 'checkbox',
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ],
      validators: [ ArrayValidators.minSelectedValues(2) ]
    },
    {
      title: 'Prefers', type: 'radio', required: true,
      options: [ 'React', 'Angular', 'Vue', 'Ember.js', 'jQuery' ]
    },
    {
      title: 'Comments', type: 'textarea'
    },
    {
      title: 'Category', type: 'select', required: true,
      options: [ 'Category 1', 'Category 2', 'Category 3' ]
    }
  ]

  constructor (private dialogService: DialogService) {

  }

  doAlert () {
    this.dialogService.withAlert('Hello!')
  }

  doConfirm () {
    this.dialogService.withConfirm('Are you sure?').pipe(
      concatMap(confirm => {
        if (confirm) {
          return this.dialogService.withAlert('Confirmed')
        } else {
          return this.dialogService.withAlert('Did not confirm')
        }
      })
    ).subscribe()
  }

  doFormSimple () {
    this.dialogService.withForm(
      'Form (Simple)',
      [ { title: 'Name', required: true } ],
      { content: 'Tell me <b>something</b> about yourself...' }
    ).pipe(
      filter(result => result),
      concatMap(result => this.dialogService.withAlert(
        'Hello!',
        {
          content: JSON.stringify(result, null, 2)
        }))
    ).subscribe()
  }

  doFormMixed () {
    this.dialogService.withForm('Form (Mixed with validators)', this.fields).pipe(
      filter(result => result),
      concatMap(result => this.dialogService.withAlert(
        'Form Result',
        {
          content: JSON.stringify(result, null, 2)
        }))
    ).subscribe()
  }

  doFormAsyncValidator () {
    // validator that will take 1 second to process. will only pass validation if value is bob
    const slowNameCheck: AsyncValidatorFn = control => {
      return of(control.value === 'bob' ? null : { 'Slow name check failed': true }).pipe(
        delay(1000)
      )
    }

    // replace first element of this.fields with an updated 'Name' field
    const updatedFields = [
      {
        title: 'Name', required: true,
        validators: [
          Validators.minLength(3),
          Validators.maxLength(10)
        ],
        asyncValidators: [ slowNameCheck ]
      },
      ...this.fields.slice(1)
    ]

    this.dialogService.withForm('Form (Async validator)', updatedFields).pipe(
      filter(result => result),
      concatMap(result => this.dialogService.withAlert(
        'Form Result',
        {
          content: JSON.stringify(result, null, 2)
        }))
    ).subscribe()
  }

  doProgress () {
    const work$ = of('output').pipe(delay(2000))

    this.dialogService.withProgress(work$).pipe(
      concatMap(result => this.dialogService.withAlert(
        'Progress Result',
        {
          content: JSON.stringify(result, null, 2)
        }))
    ).subscribe()
  }

  doCombined () {
    const submitForm$ = (values: any) => of(values).pipe(
      tap(() => {
        console.log('Pretend to submit these to server...')
        console.log(values)
      }),
      delay(1500)
    )

    this.dialogService.withConfirm('Start Demo?').pipe(
      filter(startDemo => startDemo),
      concatMap(() => this.dialogService.withForm('Form', this.fields)),
      filter(formValues => formValues),
      concatMap(formValues => this.dialogService.withConfirm(
        'Submit form values to server?',
        { content: JSON.stringify(formValues, null, 2) }).pipe(
        map(submitToServer => ({ submitToServer, formValues }))
      )),
      concatMap(({ submitToServer, formValues }) => {
        if (submitToServer) {
          return this.dialogService.withProgress(submitForm$(formValues), 'Sending data to server...')
        } else {
          return this.dialogService.withAlert('Did not send data to server')
        }
      })
    ).subscribe()
  }
}
