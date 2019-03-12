import { Observable } from 'rxjs'
import { DialogFormField } from './models/DialogFormField'

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
   */
  abstract withProgress<T = any> (work: Observable<T>, title?: string): Observable<T | undefined>

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
   * @param options Dialog options. 'content' represents content to be display in dialog;
   * 'submitButton' represents label to submit form (defaults to 'Submit'); 'cancelButton'
   * represents label to cancel form (defaults to 'Cancel')
   * @returns Observable with form value object on submission, or false if form was cancelled
   */
  abstract withForm (
    title: string,
    fields: DialogFormField[],
    options?: {
      content?: string
      submitButton?: string
      cancelButton?: string
    }): Observable<any>
}
