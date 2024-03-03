/*
The code starts by declaring a formErrors object that will be used to
store the validation errors. Then, it loops through all the controls in 
the form group and checks if the control is valid, whether it has been touched or
is dirty. If the control is invalid and any of these conditions are true, the code 
looks up the validation messages for the control's key in the validationMessages object,
and adds the error message for the corresponding error key to the formErrors object.

The code also checks if the current control is a FormGroup or FormArray. If it is,
the code calls the getValidationErrors method recursively for the nested form group or array.

Finally, the code returns the formErrors object, which contains the validation errors for the
form group.
*/
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  getValidationErrors(group: FormGroup, validationMessages: any): any {
    var formErrors = {} as any;
    debugger

    Object.keys(group.controls).forEach((key: any) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        let groupError = this.getValidationErrors(
          abstractControl,
          validationMessages
        );
        formErrors = { ...formErrors, ...groupError };
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            let groupError = this.getValidationErrors(
              control,
              validationMessages
            );
            formErrors = { ...formErrors, ...groupError };
          }
        }
      }
    });
    return formErrors;
  }
}
