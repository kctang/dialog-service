import { Observable, Subject } from 'rxjs'
import { QuickFormField } from 'ng-quick-form'
import { FormGroup } from '@angular/forms'
import { ChangeDetectorRef } from '@angular/core'

/**
 * The DialogService class exposes functions used to create alert, confirmation, progress and form
 *  based dialogs.
 */
export abstract class DialogService {
  /**
   * Display progress dialog that blocks UI interaction until processing of completes.
   *
   * When observable completes, return the last value emitted by observable workload.
   *
   * If observable throws error, progress dialog will close with undefined value.
   *
   * @param work Observable workload
   * @param title Dialog title (defaults to 'Please Wait...')
   * @param options Dialog options. 'dialogOptions' are options that will be passed to underlying
   * dialog implementation (i.e. Angular Material). It provides a way to supply options to
   * MatDialogConfig.
   */
  abstract withProgress<T = any> (work: Observable<T>, title?: string,
                                  options?: {
                                    dialogOptions?: { [ key: string ]: any }
                                  }): Observable<T | undefined>

  /**
   * Display alert dialog.
   *
   * @param title Dialog title
   * @param options Dialog options. 'content' represents content to be display in dialog
   * @returns Observable with true value if user clicks OK to accept the alert message, false
   * otherwise
   */
  abstract withAlert (
    title: string,
    options?: {
      content?: string
      acceptButton?: string
      dialogOptions?: { [ key: string ]: any }
    }
  ): Observable<boolean>

  /**
   * Display confirmation dialog.
   *
   * @param title Optional dialog title (defaults to 'Confirm?')
   * @param options Dialog options. 'content' represents content to be display in dialog;
   * 'acceptButton' represents label to accept confirmation (defaults to 'Yes'); 'cancelButton'
   * represents label to cancel confirmation (defaults to 'No')
   * @returns Observable with true value if user accepts the confirmation, false otherwise
   */
  abstract withConfirm (
    title?: string,
    options?: {
      content?: string
      acceptButton?: string
      cancelButton?: string
      cancelMessage?: string
      dialogOptions?: { [ key: string ]: any }
    }
  ): Observable<boolean>

  /**
   * Display a dialog with form fields for data collection. Each form field definition describes:
   *
   * - title. Label for the field. Required.
   *
   * - id. Unique identifier for the field. Optional. Defaults to camel case representation of
   * title.
   *
   * - type. Field type. Valid values are 'text', 'textarea', 'switch', 'radio', 'checkbox',
   * 'select' and 'password'. Optional. Defaults to 'text'.
   *
   * - value. Default value for the field when the form is displayed. Optional.
   *
   * - options. List of possible options for 'radio', 'checkbox' and 'select' field types. Options
   * can be specified as an "array of string" or an "array of object with 'value' and 'label' as
   * keys". Optional.
   *
   * - required. Flag to indicate that field input is required. Optional. Defaults to false.
   *
   * - validators. Array of Angular validation functions (i.e. ValidatorFn). Optional.
   *
   * - asyncValidators. Array of asynchronous Angular validation functions (i.e. AsyncValidatorFn).
   * Optional.
   *
   * The dialog will close and return form values (as a JSON object) when user clicks on submit
   * button (provided all field validation passed).If user cancels the form, the dialog will close
   * and return false.
   *
   * @param title
   * @param fields
   * @param options Dialog options.
   *  - 'content' represents content to be display in dialog;
   *  - 'submitButton' represents label to submit form (defaults to 'Submit');
   *  - 'cancelButton' represents label to cancel form (defaults to 'Cancel');
   *  - 'layout' defines the form's layout attributes (uses "flex-cell");
   *  - 'rawValue' is used to get form raw value. Default is false.
   *  - 'valueChanges' is used to receive form value change (experimental)
   *  - 'formCreated' if specified, this callback function is called when the form is created. It
   *      let user perform post FormGroup creation processing (experimental). e.g. to listen to
   *      specific field value changes for advanced form manipulation/validation requirements.
   * @returns Observable with form value object on submission, or false if form was cancelled
   */
  abstract withForm (
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
    }): Observable<any>
}
