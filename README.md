# dialog-service
[![npm](https://img.shields.io/npm/v/dialog-service.svg)](https://www.npmjs.com/package/dialog-service)
[![Build Status](https://travis-ci.org/kctang/dialog-service.svg)](http://github.com/kctang/dialog-service)
![license](https://img.shields.io/npm/l/dialog-service.svg)
![dependencies](https://img.shields.io/david/kctang/dialog-service.svg)

> Reactive Angular modal dialogs. Create alert, confirmation, progress and form based dialogs without writing component templates. 

[ [Documentation & Demos](https://dialog-service.surge.sh) | [StackBlitz Template](https://stackblitz.com/edit/dialog-service-starter) ]

- Create pre-defined modal dialogs without writing Angular component templates.
- Support for alert, confirmation and progress dialogs.
- Support for form based dialogs using a high-level form definition abstraction. 
    - No need to deal with Angular form controls, react to form value changes or layout form fields 
    in Angular component templates.
    - Supported field types: text,  textarea,  switch,  radio,  checkbox,  select,  password.
    - Supports standard Angular form validators and async validators.
    - Just receive JSON object with validated form values when user submits the form.
- API Design
    - Simple. Four primary API functions: `withAlert()`, `withProgress()`, `withConfirm()`, `withForm()`.
    - Reactive. Functions return observables with appropriate data to facilitate a more fluent reactive programming pattern.
    - API designed to be UI toolkit agnostic. Currently supports [Angular Material](https://material.angular.io/) 
    and [Material Web Components for Angular](https://trimox.github.io/angular-mdc-web/#/angular-mdc-web/home).

## Getting Started

* Before installing this library, you need an existing Angular application configured with 
Angular Material (or Material Web Components for Angular).

* Add `dialog-service` as an NPM dependency with `npm install dialog-service`. 

* Import this module to your application:

```typescript
import { MatDialogServiceModule } from 'dialog-service'
// import { MdcDialogServiceModule } from 'dialog-service'

@NgModule({
  ...
  imports: [
    // --- if you are using Angular Material
    MatDialogServiceModule
    
    // --- if you are using Material Web Components for Angular
    // MdcDialogServiceModule
  ]
  ...
})
export class AppModule {
}
```

* Inject `DialogService` to your components and call the `withXxx()` functions.
````typescript
@Component()
export class AppComponent {
  constructor (private dialogService: DialogService) {
  }
  
  doDemo() {
    // no need to subscribe if not piping with additional operators
    this.dialogService.withAlert('Hello!')
  }
  
  doDemo2() {
    // need to subscribe for piped operators to run
    this.dialogService.withAlert('Get ready...').pipe(
      concatMap(() => this.dialogService.withAlert('Go!'))
    ).subscribe()
  }
}
````

## DialogService API

The DialogService class exposes functions used to create alert, confirmation, progress and form 
based dialogs.

### withAlert()

````typescript
withAlert (
    title: string,
    options?: {
        content?: string
        acceptButton?: string // defaults to 'OK'
    }
): Observable<boolean>
````

Displays an alert dialog with optional title and content. User clicks OK to close the dialog.

Returns true after the dialog is closed. TODO: provide option to cancel the alert and return false.

### withConfirm()

```typescript
withConfirm (
    title?: string,           // defaults to 'Confirm?'
    options?: { 
      content?: string
      acceptButton?: string   // defaults to 'Yes'
      cancelButton?: string   // defaults to 'No
      cancelMessage?: string  // defaults to 'Cancel?'
    }
): Observable<boolean>
```

Display confirmation dialog. The dialog will close when user clicks on either the accept or cancel 
button.

Returns true if user clicks on the `acceptButton` and false if user clicks on `cancelButton`.

### withProgress()

```typescript
withProgress<T = any> (
  work: Observable<T>
  title?: string // defaults to 'Please Wait...'
): Observable<T | undefined>
```

Display dialog with a spinner/progress bar that blocks UI interaction until processing of associated 
observable workload completes.

Returns the last value emitted by the workload. If workload throws error, progress dialog will 
close and return undefined. 

### withForm()

```typescript
withForm (
    title: string,
    fields: DialogFormField[],
    options?: {
        content?: string
        submitButton?: string
        cancelButton?: string
    }
): Observable<any>
```

DialogService class exposes functions to create alert, confirmation, progress and form based dialogs.

The dialog will close and return form values (as a JSON object) when user clicks on submit button 
(provided all field validation passed).If user cancels the form, the dialog will close and return 
false. 

`DialogFormField` describes a form field
with the following properties:

   - **`title`** - Label for the field. Required.
   - **`id`** - Unique identifier for the field. Optional. Defaults to camel case representation of title.
   - **`type`** - Field type. Valid values are `text`, `textarea`, `switch`, `radio`, `checkbox`, `select` and `password`. Optional. Defaults to `text`.
   - **`value`** - Default value for the field when the form is displayed. Optional.
   - **`options`** - List of possible options for `radio`, `checkbox` and `select` field types. Options can be specified as an "array of string" or an "array of object with `value` and `label` as keys". Optional.
   - **`required`** - Flag to indicate that field input is required. Optional. Defaults to false.
   - **`validators`** - Array of Angular validation functions (i.e. ValidatorFn). Optional.
   - **`asyncValidators`** - Array of asynchronous Angular validation functions (i.e. AsyncValidatorFn). Optional.


## Publish Library

To publish the library:

```
ng lint dialog-service
ng build dialog-service
cd dist/dialog-service
npm publish
```

## Support

Reach out to me on Twitter at @kctang

## License

MIT
