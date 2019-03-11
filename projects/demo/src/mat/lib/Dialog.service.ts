import { Observable } from 'rxjs'
import { DialogFormField } from './models/DialogFormField'

/**
 * Dialog service provides pre-configured dialogs for common use cases.
 *
 * - Progress dialog displays a progress bar before processing a user workload in the form of an
 * observable. When the observable completes, the progress dialog will close automatically,
 * returning the last value emitted by the user workload.
 *
 * - Alert dialog displays an alert dialog with optional title and content. User clicks OK to close
 * the dialog.
 *
 * - Confirm dialog displays a modal dialog with a customizable question ('Confirm?') and two
 * buttons ('Yes', 'No'). Dialog close when user makes a selection, returning true or false.
 *
 * - Form dialog displays a modal dialog with a customizable form for data collection. The dialog
 * will be closed when form has been submitted successfully (i.e. passed validations), returning
 * form data as JSON object. Form fields are defined via DialogFormField and it supports Angular's
 * standard form validation (ValidatorFn) and async validation (AsyncValidatorFn) functions.
 *
 * The DialogService API was designed to be UI toolkit agnostic. Currently, it supports Material Web
 * Components for Angular (https://github.com/trimox/angular-mdc-web). Support for Angular Material
 * will be implemented if it gets 100 stars.
 *
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
   * Display alert dialog with specified title.
   *
   * @param title Dialog title
   * @param options Dialog options. 'content' represents content to be display in dialog
   * @returns Observable with true value if user clicks OK to accept the alert message, false
   * otherwise
   */
  abstract withAlert (title: string, options?: {
    content?: string
    acceptButton?: string
  }): Observable<boolean>

  /**
   * Display confirmation dialog with specified title.
   *
   * @param title Optional dialog title (defaults to 'Confirm?')
   * @param options Dialog options. 'content' represents content to be display in dialog;
   * 'acceptButton' represents label to accept confirmation (defaults to 'Yes'); 'cancelButton'
   * represents label to cancel confirmation (defaults to 'No')
   * @returns Observable with true value if user accepts the confirmation, false otherwise
   */
  abstract withConfirm (title?: string, options?: {
    content?: string
    acceptButton?: string
    cancelButton?: string
    cancelMessage?: string
  }): Observable<boolean>

  /**
   *
   * @param title
   * @param fields
   * @param options Dialog options. 'content' represents content to be display in dialog;
   * 'submitButton' represents label to submit form (defaults to 'Submit'); 'cancelButton'
   * represents label to cancel form (defaults to 'Cancel')
   * @returns Observable with form value object on submission, or false if form was cancelled
   */
  abstract withForm (title: string, fields: DialogFormField[], options?: {
    content?: string
    submitButton?: string
    cancelButton?: string
  }): Observable<any>
}
