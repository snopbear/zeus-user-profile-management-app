import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}
  getValidationErrors(group: FormGroup, validationMessages: any): any {
    var formErrors = {} as any;

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
