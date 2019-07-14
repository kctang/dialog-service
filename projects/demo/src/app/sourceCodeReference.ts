export const sourceCodeReference = {
  alert: 'this.dialogService.withAlert(\'Hello!\')',

  confirm: 'this.dialogService.withConfirm(\'Are you sure?\').pipe(\n' +
    '  concatMap(confirm => {\n' +
    '    if (confirm) {\n' +
    '      return this.dialogService.withAlert(\'Confirmed\')\n' +
    '    } else {\n' +
    '      return this.dialogService.withAlert(\'Did not confirm\')\n' +
    '    }\n' +
    '  })\n' +
    ').subscribe()\n',

  forgotUsername: '// simulate user lookup\n' +
    'const lookUpUsername$ = (formValues: any) => {\n' +
    '  const username = formValues.email === \'bob@gmail.com\' ? \'bob\' : false\n' +
    '  return of(username).pipe(\n' +
    '    // simulate 1 second processing delay\n' +
    '    delay(1000)\n' +
    '  )\n' +
    '}\n' +
    '\n' +
    'this.dialogService.withConfirm(\n' +
    '  \'Forgot Username\',\n' +
    '  { content: \'Are you a registered user?\' }\n' +
    ').pipe(\n' +
    '  filter(registeredUser => registeredUser === true),\n' +
    '  concatMap(() => this.dialogService.withForm(\n' +
    '    \'What is your email?\',\n' +
    '    [ { title: \'Email\' } ],\n' +
    '    { content: \'Try <i>bob@gmail.com</i>\' }\n' +
    '  )),\n' +
    '  filter(formValues => formValues !== false),\n' +
    '  concatMap(formValues => this.dialogService.withProgress(lookUpUsername$(formValues))),\n' +
    '  concatMap(username => {\n' +
    '    const message = username ? `Username is [${username}]` : \'Email not registered\'\n' +
    '    return this.dialogService.withAlert(message)\n' +
    '  })\n' +
    ').subscribe()\n',

  fields: 'fields: QuickFormField[] = [\n' +
    '  {\n' +
    '    title: \'Name\', required: true,\n' +
    '    validators: [\n' +
    '      Validators.minLength(3),\n' +
    '      Validators.maxLength(10)\n' +
    '    ]\n' +
    '  },\n' +
    '  { title: \'Programmer?\', type: \'switch\' },\n' +
    '  {\n' +
    '    title: \'Experience in\', type: \'checkbox\',\n' +
    '    options: [ \'React\', \'Angular\', \'Vue\', \'Ember.js\', \'jQuery\' ],\n' +
    '    validators: [ ArrayValidators.minSelectedValues(2) ]\n' +
    '  },\n' +
    '  {\n' +
    '    title: \'Prefers\', type: \'radio\', required: true,\n' +
    '    options: [ \'React\', \'Angular\', \'Vue\', \'Ember.js\', \'jQuery\' ]\n' +
    '  },\n' +
    '  {\n' +
    '    title: \'Comments\', type: \'textarea\'\n' +
    '  },\n' +
    '  {\n' +
    '    title: \'Category\', type: \'select\', required: true,\n' +
    '    options: [ \'Category 1\', \'Category 2\', \'Category 3\' ]\n' +
    '  }\n' +
    ']\n',

  formSimple: `this.dialogService.withForm(
      'Form (Simple)',
      [
        { title: 'Name', required: true },
        { title: 'Email', required: true },
        { title: 'Address', type: 'textarea', required: true, layout: { cell: 8 } }
      ],
      {
        content: 'Tell me <b>something</b> about yourself...',
        layout: {
          flexCell: true,
          gutter: true,
          growItems: true
        }
      }
    ).pipe(
      filter(result => result),
      concatMap(result => this.dialogService.withAlert(
        'Hello!',
        {
          content: JSON.stringify(result, null, 2)
        }))
    ).subscribe()`,

  formMixed: 'this.dialogService.withForm(\'Form (Mixed with validators)\', this.fields).pipe(\n' +
    '  filter(result => result),\n' +
    '  concatMap(result => this.dialogService.withAlert(\n' +
    '    \'Form Result\',\n' +
    '    {\n' +
    '      content: JSON.stringify(result, null, 2)\n' +
    '    }))\n' +
    ').subscribe()\n',

  formAsyncValidator: '// validator that will take 1 second to process. will only pass validation if value is bob\n' +
    'const slowNameCheck: AsyncValidatorFn = control => {\n' +
    '  return of(control.value === \'bob\' ? null : { \'Slow name check failed\': true }).pipe(\n' +
    '    delay(1000)\n' +
    '  )\n' +
    '}\n' +
    '\n' +
    '// replace first element of this.fields with an updated \'Name\' field\n' +
    'const updatedFields = [\n' +
    '  {\n' +
    '    title: \'Name\', required: true,\n' +
    '    validators: [\n' +
    '      Validators.minLength(3),\n' +
    '      Validators.maxLength(10)\n' +
    '    ],\n' +
    '    asyncValidators: [ slowNameCheck ]\n' +
    '  },\n' +
    '  ...this.fields.slice(1)\n' +
    ']\n' +
    '\n' +
    'this.dialogService.withForm(\'Form (Async validator)\', updatedFields).pipe(\n' +
    '  filter(result => result),\n' +
    '  concatMap(result => this.dialogService.withAlert(\n' +
    '    \'Form Result\',\n' +
    '    {\n' +
    '      content: JSON.stringify(result, null, 2)\n' +
    '    }))\n' +
    ').subscribe()\n',

  progress: 'const work$ = of(\'output\').pipe(delay(2000))\n' +
    '\n' +
    'this.dialogService.withProgress(work$).pipe(\n' +
    '  concatMap(result => this.dialogService.withAlert(\n' +
    '    \'Progress Result\',\n' +
    '    {\n' +
    '      content: JSON.stringify(result, null, 2)\n' +
    '    }))\n' +
    ').subscribe()\n',

  combined: 'const submitForm$ = (values: any) => of(values).pipe(\n' +
    '  tap(() => {\n' +
    '    console.log(\'Pretend to submit these to server...\')\n' +
    '    console.log(values)\n' +
    '  }),\n' +
    '  delay(1500)\n' +
    ')\n' +
    '\n' +
    'this.dialogService.withConfirm(\'Start Demo?\').pipe(\n' +
    '  filter(startDemo => startDemo),\n' +
    '  concatMap(() => this.dialogService.withForm(\'Form\', this.fields)),\n' +
    '  filter(formValues => formValues),\n' +
    '  concatMap(formValues => this.dialogService.withConfirm(\n' +
    '    \'Submit form values to server?\',\n' +
    '    { content: JSON.stringify(formValues, null, 2) }).pipe(\n' +
    '    map(submitToServer => ({ submitToServer, formValues }))\n' +
    '  )),\n' +
    '  concatMap(({ submitToServer, formValues }) => {\n' +
    '    if (submitToServer) {\n' +
    '      return this.dialogService.withProgress(submitForm$(formValues), \'Sending data to server...\')\n' +
    '    } else {\n' +
    '      return this.dialogService.withAlert(\'Did not send data to server\')\n' +
    '    }\n' +
    '  })\n' +
    ').subscribe()\n',

  install1: 'import { MatDialogServiceModule } from \'dialog-service\'\n' +
    '// import { MdcDialogServiceModule } from \'dialog-service\'\n' +
    '\n' +
    '@NgModule({\n' +
    '  ...\n' +
    '  imports: [\n' +
    '    // --- if you are using Angular Material\n' +
    '    MatDialogServiceModule\n' +
    '    \n' +
    '    // --- if you are using Material Web Components for Angular\n' +
    '    // MdcDialogServiceModule\n' +
    '  ]\n' +
    '  ...\n' +
    '})\n' +
    'export class AppModule {\n' +
    '}',

  install2: '@Component()\n' +
    'export class AppComponent {\n' +
    '  constructor (private dialogService: DialogService) {\n' +
    '  }\n' +
    '  \n' +
    '  doDemo() {\n' +
    '    // no need to subscribe if not piping with additional operators\n' +
    '    this.dialogService.withAlert(\'Hello!\')\n' +
    '  }\n' +
    '  \n' +
    '  doDemo2() {\n' +
    '    // need to subscribe for piped operators to run\n' +
    '    this.dialogService.withAlert(\'Get ready...\').pipe(\n' +
    '      concatMap(() => this.dialogService.withAlert(\'Go!\'))\n' +
    '    ).subscribe()\n' +
    '  }\n' +
    '}',

  install3: `@import "~common-style-attributes/styles/common-style-attributes";
@import "~common-style-attributes/styles/csa-typography";`,

  sampleData: '{\n' +
    '    \'name\': \'bob\',\n' +
    '    \'programmer?\': true,\n' +
    '    \'experienceIn\': [ \'React\', \'Angular\', \'Vue\', \'jQuery\' ],\n' +
    '    \'prefers\': \'jQuery\',\n' +
    '    \'comments\': \'Just saying..\',\n' +
    '    \'category\': \'Category 2\'\n' +
    '}',

  apiWithProgress: 'withProgress<T = any> (\n' +
    '  work: Observable<T>\n' +
    '  title?: string // defaults to \'Please Wait...\'\n  dialogOptions?: { [ key: string ]: any }\n' +
    '): Observable<T | undefined>',

  apiWithAlert: 'withAlert (\n' +
    '    title: string,\n' +
    '    options?: {\n' +
    '        content?: string\n' +
    '        acceptButton?: string // defaults to \'OK\'\n        dialogOptions?: { [ key: string ]: any }\n' +
    '    }\n' +
    '): Observable<boolean>',

  apiWithConfirm: 'withConfirm (\n' +
    '    title?: string,           // defaults to \'Confirm?\'\n' +
    '    options?: { \n' +
    '      content?: string\n' +
    '      acceptButton?: string   // defaults to \'Yes\'\n' +
    '      cancelButton?: string   // defaults to \'No\n' +
    '      cancelMessage?: string  // defaults to \'Cancel?\'\n      dialogOptions?: { [ key: string ]: any }\n' +
    '    }\n' +
    '): Observable<boolean>',

  apiWithForm: `withForm (
  title: string,
  fields: QuickFormField[],
  options?: {
    content?: string
    submitButton?: string
    cancelButton?: string
    layout?: {
      flexCell?: boolean | 6 | 12
      gutter?: boolean
      growItems?: boolean
      debug?: boolean
    },
    rawValue?: boolean,
    valueChanges?: Subject<{ value: any, form: FormGroup, cd: ChangeDetectorRef }>
    formCreated?: (form: FormGroup, cd: ChangeDetectorRef) => void
    dialogOptions?: { [ key: string ]: any }
}): Observable<any>`,

  requirement1: 'withConfirm(\'Forgot Username\', { content: \'Are you a registered user?\' })',
  requirement2: 'withForm(\'What is your email?\',[ { title: \'Email\' } ])',
  requirement3: 'withProgress(lookUpUsername$(formValues))',
  requirement4: 'withAlert(username ? ``Username is [${username}]`` : \'Email not registered\')'
}
